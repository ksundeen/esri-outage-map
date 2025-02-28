import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

const ArcGISMap: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webMap = new WebMap({
        portalItem: { id: "150033d1b12545b68f594b46a78b961c" }, // Sample Map
      });

      new MapView({
        container: mapDiv.current,
        map: webMap,
      });
    }
  }, []);

  return <div style={{ width: "100%", height: "500px" }} ref={mapDiv}></div>;
};

export default ArcGISMap;
