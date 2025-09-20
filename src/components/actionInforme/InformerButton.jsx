import { Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { dashAxios } from "../../config/DashAxios";

export default function InformeButton({
  est,
  setSelectedStudy,
  setOpenInforme,
}) {
  const handleClick = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 📱 Mobile → Descargar PDF usando dashAxios
      try {
        const response = await dashAxios.get(
          `/dashboard/informe/${est.Study.ID}`,
          {
            responseType: "blob", // necesario para PDF
          }
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
      // 🖥️ Desktop → Abrir modal
      setSelectedStudy(est);
      setOpenInforme(true);
    }
  };

  return (
    <Tooltip title="Ver informe">
      <DescriptionIcon
        fontSize="small"
        color="primary"
        sx={{ cursor: "pointer", marginRight: 2 }}
        onClick={handleClick}
      />
    </Tooltip>
  );
}
