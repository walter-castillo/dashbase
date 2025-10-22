import { Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { dashAxios } from "../../config/DashAxios";

export default function InformeButton({
  est,
  setSelectedStudy,
  setOpenInforme,
}) {
  const handleClick = async () => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (mobile) {
      try {
        const res = await dashAxios.get(
          `/dashboard/informe/ver/${est.Study.ID}`,
          {
            responseType: "blob",
          }
        );

        const blobUrl = URL.createObjectURL(res.data);
        const fileName = `${est.Patient.PatientID}-${est.Patient.PatientName}-${est.Study.AccessionNumber}.pdf`;

        const link = Object.assign(document.createElement("a"), {
          href: blobUrl,
          download: fileName,
        });

        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("Error al descargar PDF:", err);
      }
    } else {
      setSelectedStudy(est);
      setOpenInforme(true);
    }
  };

  return (
    <Tooltip title="Ver informe">
      <DescriptionIcon
        fontSize="small"
        color="primary"
        sx={{ cursor: "pointer", mr: 2 }}
        onClick={handleClick}
      />
    </Tooltip>
  );
}
