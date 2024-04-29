import { useEffect, useState } from "react";
import axios from "axios";

import { useGeographic } from 'ol/proj';
import { Geometry } from "ol/geom";
import { Feature } from "ol";

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Map from 'ol/Map';
import "ol/ol.css";

const MapPlain = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const apiUrl = 'http://localhost:8080/geoserver/gsdb_simadu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gsdb_simadu%3Aprovinsi_jateng&outputFormat=application%2Fjson';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setGeojsonData(response.data);
      } catch (error) {
        console.log('upss, something when wrong', error);
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (geojsonData) {
      console.log('data jateng', geojsonData);
      useGeographic();
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData) as Feature<Geometry>[],
      });
      
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      new Map({
        target: 'map-container',
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer,
        ],
        view: new View({
          center: [110, -7],
          zoom: 8,
        }),
      });
    }
  }, [geojsonData]);

  return (
    <div id="map-container" className="w-full h-screen z-0 absolute top-0"></div>
  );
};

export default MapPlain;
