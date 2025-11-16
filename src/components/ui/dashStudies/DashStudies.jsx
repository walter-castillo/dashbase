import React, { useEffect, useState, useMemo } from "react";
import { Paper, Box, Divider } from "@mui/material";
import dayjs from "dayjs";

import FiltroEstudios from "./FiltroEstudios";
import AccionesEstudios from "./AccionesEstudios";
import TableAdmin from "./TableAdmin";
import PaginacionEstudios from "./PaginacionEstudios";
import { dashAxios } from "../../../config/axiosClients";
import { Loading } from "../Loading";

const columnMap = {
  Paciente: "PatientName",
  DNI: "PatientID",
  Fecha: "StudyDate",
  Modalidad: "ModalitiesInStudy",
  "Número Estudio": "AccessionNumber",
  Informe: "tieneINF",

};

const DashStudies = () => {
  const [filtros, setFiltros] = useState({
    nombre: "",
    dni: "",
    modality: "",
    desde: dayjs("2000-01-01"),
    hasta: dayjs(),
    // desde: null,
    // hasta: null,
    numeroEstudio: "",
  });

  const [estudios, setEstudios] = useState([]);
  const [orden, setOrden] = useState({ orden: "asc", ordenPor: "StudyDate" });
  const [pagina, setPagina] = useState(0);
  const [porPagina, setPorPagina] = useState(10);
  const [mostrarRecientes, setMostrarRecientes] = useState(false);
  const [loading, setLoading] = useState(false);

  const hayFiltrosActivos = useMemo(
    () =>
      Object.values(filtros).some(
        (v) => v !== "" && v !== null && v !== undefined
      ),
    [filtros]
  );

  const handleBuscar = async () => {
    if (
      filtros.desde &&
      filtros.hasta &&
      dayjs(filtros.hasta).isBefore(dayjs(filtros.desde))
    ) {
      alert("La fecha 'Hasta' no puede ser anterior a 'Desde'");
      return;
    }

    const query = new URLSearchParams();
    if (filtros.nombre) query.append("nombre", filtros.nombre);
    if (filtros.dni) query.append("dni", filtros.dni);
    if (filtros.modality) query.append("modality", filtros.modality);
    if (filtros.desde)  query.append("desde", dayjs(filtros.desde).format("YYYYMMDD"));
    if (filtros.hasta)  query.append("hasta", dayjs(filtros.hasta).format("YYYYMMDD"));
    if (filtros.numeroEstudio) query.append("numeroEstudio", filtros.numeroEstudio);

    try {
      setLoading(true);
      const { data } = await dashAxios.get(`/dashboard/studiesFilter?${query}`);
      console.log(data.estudios);
      setEstudios(data.estudios);
      setPagina(0);
    } catch (err) { console.error("Error al buscar estudios:", err);
    } finally { setLoading(false) }
  };

  const handleLimpiar = () => {
    setFiltros({
      nombre: "",
      dni: "",
      modality: "",
      desde: null,
      hasta: null,
      numeroEstudio: "",
    });
    setEstudios([]);
  };

  const obtenerValorOrden = (estudio, campo) => {
    const valor =
      campo === "PatientName" ||
      campo === "PatientID" ||
      campo === "AccessionNumber"
        ? estudio.Patient?.[campo] || estudio.Study?.[campo] // Para AccessionNumber buscar en Study
        : estudio.Study?.[campo];

    // Si es PatientID o AccessionNumber numérico puro, convertir a número
    if (
      (campo === "PatientID" || campo === "AccessionNumber") &&
      /^\d+$/.test(valor)
    ) {
      return parseInt(valor, 10);
    }

    return valor || "";
  };
  

  const estudiosOrdenados = useMemo(() => {
    return [...estudios].sort((a, b) => {
      const aVal = obtenerValorOrden(a, orden.ordenPor);
      const bVal = obtenerValorOrden(b, orden.ordenPor);

      // Si ambos son números, ordenar numéricamente
      if (typeof aVal === "number" && typeof bVal === "number") {
        return orden.orden === "asc" ? aVal - bVal : bVal - aVal;
      }

      // Si no, usar comparación de texto
      return orden.orden === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [estudios, orden]);
  

  const estudiosPaginados = useMemo(() => {
    const inicio = pagina * porPagina;
    return estudiosOrdenados.slice(inicio, inicio + porPagina);
  }, [estudiosOrdenados, pagina, porPagina]);

  useEffect(() => {
    if (mostrarRecientes) {
      setFiltros({
        nombre: "",
        dni: "",
        modality: "",
        desde: null,
        hasta: null,
        numeroEstudio: "",
      });
      const fetchRecentStudies = async () => {
        await handleBuscar();
        setMostrarRecientes(false);
      };
      fetchRecentStudies();
    }
  }, [mostrarRecientes]);

  useEffect(() => {
    handleBuscar();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <FiltroEstudios
        filtros={filtros}
        setFiltros={setFiltros}
        handleLimpiar={handleLimpiar}
        hayFiltrosActivos={hayFiltrosActivos}
        onBuscar={handleBuscar}
      />
      <Divider />
      <AccionesEstudios
        estudios={estudiosOrdenados}
        onVerRecientes={() => setMostrarRecientes(true)}
        onLimpiarFiltros={handleLimpiar}
        hayFiltrosActivos={hayFiltrosActivos}
      />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
          mt={-50}
        >
          <Loading />
        </Box>
      ) : (
        <>
          <TableAdmin
            estudios={estudiosPaginados}
            setEstudios={setEstudios}
            orden={orden}
            setOrden={setOrden}
            columnMap={columnMap}
          />

          {estudios.length > 0 && (
            <PaginacionEstudios
              total={estudios.length}
              pagina={pagina}
              porPagina={porPagina}
              setPagina={setPagina}
              setPorPagina={setPorPagina}
            />
          )}
        </>
      )}
    </Paper>
  );
};

export default DashStudies;
