import { Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

import { PatientAxios } from "../../../config/PatientAxios";

export default function InformeButton({ est, onClick }) {
  const handleClick = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      try {
        const response = await PatientAxios.get(
          `/dashboard/informe/ver/${est.Study.ID}`,
          { responseType: "blob" }
        );

        const blobUrl = window.URL.createObjectURL(response.data);
        const fileName = `${est.Patient.PatientID}-${est.Patient.PatientName}-${est.Study.AccessionNumber}.pdf`;

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error al descargar:", error);
      }
    } else {
      onClick(est); // abre modal en desktop
    }
  };

  return (
    <Tooltip title={est.tieneINF ? "Ver informe" : "Sin informe"}>
      <span>
        <DescriptionIcon
          sx={{
            color: est.tieneINF ? "#9c27b0" : "#ccc",
            cursor: est.tieneINF ? "pointer" : "default",
            opacity: est.tieneINF ? 1 : 0.4,
            mr: 1,
          }}
          onClick={est.tieneINF ? handleClick : undefined}
        />
      </span>
    </Tooltip>
  );
}
