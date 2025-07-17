import React, { useEffect, useState, useMemo } from "react";
import { Paper, Box } from "@mui/material";
import dayjs from "dayjs";

import FiltroEstudios from "./FiltroEstudios";
import AccionesEstudios from "./AccionesEstudios";
import TablaEstudios from "./TablaEstudios";
import PaginacionEstudios from "./PaginacionEstudios";

import exportToExcel from "./utils/exportToExcel";
import exportToPDF from "./utils/exportToPDF";
import { dashAxios } from "../../../config/DashRcAxios";
import { Loading } from "../Loading";

const columnMap = {
  Paciente: "PatientName",
  DNI: "PatientID",
  Fecha: "StudyDate",
  Modalidad: "ModalitiesInStudy",
};

const DashStudies = () => {
  const [filtros, setFiltros] = useState({
    nombre: "",
    modality: "",
    desde: null,
    hasta: null,
  });
  const [estudios, setEstudios] = useState([]);
  const [orden, setOrden] = useState({ orden: "asc", ordenPor: "StudyDate" });
  const [pagina, setPagina] = useState(0);
  const [porPagina, setPorPagina] = useState(10);
  const [mostrarRecientes, setMostrarRecientes] = useState(false);
  const [loading, setLoading] = useState(false);

  const hayFiltrosActivos = useMemo(
    () => Object.values(filtros).some((v) => v !== "" && v !== null),
    [filtros]
  );

  const handleBuscar = async () => {
    const query = new URLSearchParams();
    if (filtros.nombre) query.append("nombre", filtros.nombre);
    if (filtros.modality) query.append("modality", filtros.modality);
    if (filtros.desde)
      query.append("desde", dayjs(filtros.desde).format("YYYYMMDD"));
    if (filtros.hasta)
      query.append("hasta", dayjs(filtros.hasta).format("YYYYMMDD"));

    try {
      setLoading(true);
      const { data } = await dashAxios.get(`/dashboard/studiesFilter?${query}`);
      setEstudios(data.estudios);
      setPagina(0);
    } catch (err) {
      console.error("Error al buscar estudios:", err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerValorOrden = (estudio, campo) => {
    if (campo === "PatientName" || campo === "PatientID") {
      return estudio.Patient?.[campo] || "";
    }
    return estudio.Study?.[campo] || "";
  };

  const estudiosOrdenados = useMemo(() => {
    return [...estudios].sort((a, b) => {
      const aVal = obtenerValorOrden(a, orden.ordenPor);
      const bVal = obtenerValorOrden(b, orden.ordenPor);
      return orden.orden === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [estudios, orden]);

  const estudiosPaginados = useMemo(() => {
    const inicio = pagina * porPagina;
    return estudiosOrdenados.slice(inicio, inicio + porPagina);
  }, [estudiosOrdenados, pagina, porPagina]);

  const handleLimpiar = () => {
    setFiltros({ nombre: "", modality: "", desde: null, hasta: null });
  };

  useEffect(() => {
    if (mostrarRecientes) {
      setFiltros({ nombre: "", modality: "", desde: null, hasta: null });
      const fetchRecentStudies = async () => {
        await handleBuscar();
        setMostrarRecientes(false);
      };
      fetchRecentStudies();
    } else {
      handleBuscar();
    }
  }, [filtros, mostrarRecientes]);

  useEffect(() => {handleBuscar()}, []);

  return (
    <Paper sx={{ p: 2 }}>
      <FiltroEstudios filtros={filtros} setFiltros={setFiltros} />
      <AccionesEstudios
        onExportPDF={() => exportToPDF(estudios)}
        onExportExcel={() => exportToExcel(estudios)}
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
          mt={-30} 
        >
          <Loading />
        </Box>
      ) : (
        <>
          <TablaEstudios
            estudios={estudiosPaginados}
            orden={orden}
            setOrden={setOrden}
            columnMap={columnMap}
          />
          <PaginacionEstudios
            total={estudios.length}
            pagina={pagina}
            porPagina={porPagina}
            setPagina={setPagina}
            setPorPagina={setPorPagina}
          />
        </>
      )}
    </Paper>
  );
};

export default DashStudies;
