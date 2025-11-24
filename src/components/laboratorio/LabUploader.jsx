import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { dashAxios } from "../../config/axiosClients";

export default function LabUploader() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    maxFiles: 15,
    onDrop: (acceptedFiles) => {
      const formatted = acceptedFiles.map((file) => ({
        file,
        progress: 0,
        status: "pending", // pending | uploading | ok | error
        data: null,
        error: null,
      }));
      setFiles(formatted);
      setResults([]);
    },
  });

  // 🔥 SUBIR TODOS LOS PDFs
  const uploadAll = async () => {
    const updated = [...files];

    for (let i = 0; i < updated.length; i++) {
      updated[i].status = "uploading";
      setFiles([...updated]);

      const formData = new FormData();
      formData.append("files", updated[i].file);

      try {
        // fake-animation de progreso (250ms → 100%)
        for (let p = 10; p <= 90; p += 10) {
          updated[i].progress = p;
          setFiles([...updated]);
          await new Promise((r) => setTimeout(r, 80));
        }

        const res = await dashAxios.post("/dashboard/labs/bulk", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const r = res.data.results[0];

        updated[i].status = r.status;
        updated[i].data = r.data || null;
        updated[i].error = r.error || null;
        updated[i].progress = 100;
      } catch (err) {
        updated[i].status = "error";
        updated[i].progress = 100;
        updated[i].error = err.message;
      }

      setFiles([...updated]);
    }
  };

  // 🔄 REINTENTAR SOLO LOS FALLADOS
  const retryErrors = async () => {
    const errors = files.filter((f) => f.status === "error");
    const toRetry = [...files];

    for (let f of errors) {
      const idx = toRetry.findIndex((t) => t.file.name === f.file.name);
      const target = toRetry[idx];

      target.status = "uploading";
      target.progress = 0;
      setFiles([...toRetry]);

      const formData = new FormData();
      formData.append("files", target.file);

      try {
        for (let p = 10; p <= 90; p += 10) {
          target.progress = p;
          setFiles([...toRetry]);
          await new Promise((r) => setTimeout(r, 80));
        }

        const res = await dashAxios.post(
          "/dashboard/labs/bulk",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const r = res.data.results[0];

        target.status = r.status;
        target.data = r.data;
        target.error = null;
        target.progress = 100;
      } catch (err) {
        target.status = "error";
        target.progress = 100;
        target.error = err.message;
      }

      setFiles([...toRetry]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* DROPZONE */}
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #888",
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          cursor: "pointer",
          background: isDragActive ? "#eee" : "#fafafa",
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="h6">
          Arrastrá hasta 15 PDFs de laboratorio
        </Typography>
        <Typography variant="body2">o hacé click para seleccionar</Typography>
      </Box>

      {/* BOTONES */}
      {files.length > 0 && (
        <Box mt={2} sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={uploadAll}>
            Subir todo
          </Button>

          <Button
            variant="outlined"
            color="warning"
            onClick={retryErrors}
            disabled={!files.some((f) => f.status === "error")}
          >
            Reintentar fallados
          </Button>
        </Box>
      )}

      {/* TABLA DE DETALLE */}
      {files.length > 0 && (
        <Paper sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Archivo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell style={{ width: "30%" }}>Progreso</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Fecha Estudio</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {files.map((f, i) => (
                <TableRow key={i}>
                  <TableCell>{f.file.name}</TableCell>

                  {/* Estado con colores */}
                  <TableCell
                    sx={{
                      color:
                        f.status === "ok"
                          ? "green"
                          : f.status === "error"
                          ? "red"
                          : f.status === "uploading"
                          ? "#1976d2"
                          : "#555",
                      fontWeight: 600,
                    }}
                  >
                    {f.status}
                  </TableCell>

                  {/* Barra de progreso */}
                  <TableCell>
                    <LinearProgress
                      variant="determinate"
                      value={f.progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                      }}
                    />
                  </TableCell>

                  {/* Datos */}
                  <TableCell>{f.data?.["NOMBRE Y APELLIDO"] || "-"}</TableCell>
                  <TableCell>{f.data?.["DNI / ID PACIENTE"] || "-"}</TableCell>
                  <TableCell>{f.data?.["FECHA DEL ESTUDIO"] || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
