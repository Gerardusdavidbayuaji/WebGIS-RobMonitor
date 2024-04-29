import { Coordinate } from "ol/coordinate";
import { useEffect } from "react";
import axios from "axios";
import "ol/ol.css";

const MapPlain = () => {
  const getCoordinate = async (): Promise<Coordinate> => {
    const apiUrl = 'http://localhost:8080/geoserver/gsdb_simadu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gsdb_simadu%3Aprovinsi_jateng&maxFeatures=50&outputFormat=application%2Fjson';

    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error: any) {
      throw Error(error.response.data);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoordinate();
        console.log('tes', data);
      } catch (error: any) {
        console.log('uppss error guys', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div id="map-container" className="w-full h-screen z-0 absolute top-0"></div>
    </>
  );
};

export default MapPlain;
