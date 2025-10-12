import { Button } from "@mui/material";

export default function ViewStudy() {
  //   const studyId = "1.2.392.200036.9125.2.1623119843216158.6564162394.8836210";
  const studyId = "1.2.276.0.7230010.3.1.2.394348317.8780.1759599213.649";

  const handleOpenViewer = () => {
    const viewerUrl = `http://localhost:3001/view/study/${studyId}`;
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
