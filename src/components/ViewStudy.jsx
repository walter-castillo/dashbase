import { Button } from "@mui/material";

export default function ViewStudy() {
  const studyId = "1.2.392.200036.9125.2.1623119843216158.6599785231.7972611";
  const viewerUrl = `http://localhost:3001/viewer?study=${studyId}`;

  const handleOpenViewer = () => {
    window.open(
      viewerUrl,
      "_blank",
      "width=1200,height=800,noopener,noreferrer"
    );
  };

  return (
    <Button variant="contained" onClick={handleOpenViewer}>
      Ver estudio
    </Button>
  );
}
