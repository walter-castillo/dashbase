import { Box } from "@mui/material";

export default function ViewStudy() {
  const viewerUrl = `http://localhost:3000/orthanc/stone-webviewer/index.html?study=1.2.276.0.7230010.3.1.2.394348317.8780.1759599213.649`;
//   const viewerUrl = `http://localhost:3000/orthanc/stone-webviewer/index.html?study=1.2.392.200036.9125.2.1623119843216158.6564162394.8836210`;

  return (
    <Box sx={{ width: "100vh", height: "100vh" }}>
      <iframe
        src={viewerUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Stone DICOM Viewer"
      />
    </Box>
  );
}
