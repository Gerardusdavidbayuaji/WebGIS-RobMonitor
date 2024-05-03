import { useEffect, useState } from "react";

import { getGenanganRob, getBatasKecamatan, getGarisPantai, getPersilBangunan, getSungai, getTitikValidasi } from "@/utils/apis/work";

import { useGeographic } from 'ol/proj';
import { Geometry } from "ol/geom";
import { Feature } from "ol";

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import LayerGroup from "ol/layer/Group";
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import * as ol from 'ol';
import "ol/ol.css";

const MapPlain = () => {
  const [map, setMap] = useState<ol.Map | null>(null);
  const [combinedGeojsonData, setCombinedGeojsonData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genanganRobData = await getGenanganRob();
        const batasKecamatanData = await getBatasKecamatan();
        const garisPantaiData = await getGarisPantai();
        const persilBangunanData = await getPersilBangunan();
        const sungaiData = await getSungai();
        const titikValidasiData = await getTitikValidasi();

        const combinedData = {
          type: 'FeatureCollection',
          features: [
            ...genanganRobData.features,
            ...batasKecamatanData.features,
            ...garisPantaiData.features,
            ...persilBangunanData.features,
            ...sungaiData.features,
            ...titikValidasiData.features
          ]
        };

        setCombinedGeojsonData(combinedData);
      } catch (error: any) {
        console.log('Oops, something went wrong', error.message);
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (combinedGeojsonData && map) {
      useGeographic();

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(combinedGeojsonData) as Feature<Geometry>[],
      });
      
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const layerGroup = new LayerGroup({
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer,
        ],
      });

      map.setLayerGroup(layerGroup);

      map.setView(new View({
        center: [113.429, -7.751],
        zoom: 13,
      }));
    }
  }, [combinedGeojsonData, map]);

  useEffect(() => {
    if (!map) {
      const targetElement = document.getElementById('map-container');
      if (targetElement) {
        const newMap = new ol.Map({
          target: targetElement,
        });
        setMap(newMap);
      }
    }

    return () => {
      if (map) {
        map.setTarget();
      }
    };
  }, [map]);

  return (
    <div id="map-container" className="w-full h-screen z-0 absolute top-0"></div>
  );
};

export default MapPlain;

