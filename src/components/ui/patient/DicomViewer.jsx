

import { useEffect, useRef } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from "dicom-parser";
import cornerstoneMath from "cornerstone-math";

// 1. Vincular dependencias externas
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser; 
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath; // Este es requerido para tools

// 2. Inicializar tools SOLO UNA VEZ
if (!cornerstoneTools.store) {
  cornerstoneTools.init();
}

const DicomViewer = () => {
  const elementRef = useRef(null);


  const studyUID = "1.2.392.200036.9125.2.1623119843216158.6599615425.3820769";
  const seriesUID = "1.2.392.200036.9125.3.1623119843216158.6599615425.3820787";
  const sopUID = "1.2.392.200036.9125.9.0.321426205.1309206288.734437080";

  useEffect(() => {
    const element = elementRef?.current;

    // Activamos el elemento para cornerstone
    cornerstone.enable(element);

    // ID para cargar imagen desde Orthanc vía WADO-URI
//     const imageId = `wadouri:http://localhost:8042/wado?requestType=WADO&studyUID=${studyUID}&seriesUID=${seriesUID}&objectUID=${sopUID}`;
    const imageId = `wadouri:http://localhost:8042/dicom-web/studies/1.2.392.200036.9125.2.1623119843216158.6599615425.3820769/series/1.2.392.200036.9125.3.1623119843216158.6599615425.3820787/instances/1.2.392.200036.9125.9.0.321426205.1309206288.734437080`;

    // Cargamos la imagen
    cornerstone.loadImage(imageId).then((image) => {
      cornerstone.displayImage(element, image);

      // Habilitamos herramientas básicas
      cornerstoneTools.addTool(cornerstoneTools.PanTool);
      cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
      cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);

      cornerstoneTools.setToolActive("Pan", { mouseButtonMask: 4 }); // Botón medio
      cornerstoneTools.setToolActive("Zoom", { mouseButtonMask: 2 }); // Botón derecho
      cornerstoneTools.setToolActive("StackScrollMouseWheel", {}); // Rueda scroll
    });

    return () => {
      cornerstone.disable(element);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        width: "512px",
        height: "512px",
        background: "black",
        margin: "auto",
        borderRadius: "8px",
      }}
    />
  );
};

export default DicomViewer;
 
