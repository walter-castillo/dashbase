import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ButtonOpenVisor = ({ studyId, endpointFront }) => {
  const handleOpen = () => {
    try {
      const urlFront = import.meta.env.VITE_URL_FRONT;
      const viewerUrl = `${urlFront}${endpointFront}${studyId}`;

      const width = window.screen.availWidth;
      const height = window.screen.availHeight;

      window.open(
        viewerUrl,
        "_blank",
        `width=${width},height=${height},top=0,left=0,noopener,noreferrer`
      );
    } catch (error) {
      console.error("[ButtonOpenVisor ERROR]", error);
    }
  };
  return (
    <Tooltip title="Ver estudio" arrow>
      <IconButton size="small" color="primary" onClick={handleOpen}>
        <VisibilityIcon
                    sx={{
                      color: "#2faed3",
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        color: "#6fbdd4",
                        transform: "scale(1.25)",
                      },
                    }}
                  />
      </IconButton>
    </Tooltip>
  );
};

export default ButtonOpenVisor;
 