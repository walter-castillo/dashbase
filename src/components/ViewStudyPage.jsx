import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";

export default function ViewStudyPage() {
  const [params] = useSearchParams();
  const studyId = "1.2.392.200036.9125.2.1623119843216158.6599785231.7972611";

  const viewerUrl = `http://localhost:3000/orthanc/stone-webviewer/index.html?study=${studyId}`;

  return (
    <Box sx={{ width: "100vw", height: "100vh", padding: '15px', marginTop: '0'}}>
      <iframe
        src={viewerUrl}
        style={{ width: "100%", height: "100%", border: "none"}}
        title="Stone Viewer"
      />
    </Box>
  );
}
