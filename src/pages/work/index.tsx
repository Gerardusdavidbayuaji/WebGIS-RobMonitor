import { useEffect, useState } from "react";
import { getGenanganRob, getBatasKecamatan, getGarisPantai, getPersilBangunan, getSungai, getTitikValidasi } from "@/utils/apis/work";
import { transform } from 'ol/proj';
import { Geometry } from "ol/geom";
import { Feature } from "ol";
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import LayerGroup from "ol/layer/Group";
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Map from 'ol/Map';
import "ol/ol.css";
import XYZ from "ol/source/XYZ";
import Overlay from 'ol/Overlay';

interface OverlayOptions {
  element: HTMLElement;
  autoPan?: boolean;
  autoPanAnimation?: {
    duration: number;
  };
}

const MapPlain = () => {
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  useEffect(() => {
    const fetchDataAndCreateMap = async () => {
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

        const geojsonFormat = new GeoJSON();
        const vectorSource = new VectorSource({
          features: geojsonFormat.readFeatures(combinedData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857',
          }) as Feature<Geometry>[],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        const layerGroup = new LayerGroup({
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6',
                attributions: '© <a href="https://www.maptiler.com/copyright/">MapTiler</a>, © OpenStreetMap contributors',
              })
            }),
            vectorLayer,
          ],
        });

        const targetElement = document.getElementById('map-container');
        if (targetElement) {
          const map = new Map({
            target: targetElement,
            layers: [layerGroup],
            view: new View({
              center: transform([113.429, -7.751], 'EPSG:4326', 'EPSG:3857'),
              zoom: 13,
            }),
          });

          // Buat overlay untuk menampilkan informasi properti fitur yang diklik
          const overlayElement = document.getElementById('popup-container');
          if (overlayElement) {
            const overlayOptions: OverlayOptions = {
              element: overlayElement,
              autoPan: true,
              autoPanAnimation: {
                duration: 250,
              },
            };
            const newOverlay = new Overlay(overlayOptions);
            map.addOverlay(newOverlay);
            setOverlay(newOverlay);
          }

          // Tambahkan event listener untuk interaksi klik
          map.on('click', (event) => {
            if (overlay) {
              map.forEachFeatureAtPixel(event.pixel, (feature) => {
                const properties = feature.getProperties();
                const content = `<div><strong>ID:</strong> ${properties.Id}</div><div><strong>Luas (m<sup>2</sup>):</strong> ${properties.Luas_m2}</div><div><strong>Layer:</strong> ${properties.layer}</div><div><strong>Path:</strong> ${properties.path}</div>`;
                overlay.getElement().innerHTML = content;
                overlay.setPosition(event.coordinate);
              });
            }
          });
        }
      } catch (error: any) {
        console.log('Oops, something went wrong', error.message);
      }
    };
    
    fetchDataAndCreateMap();
  }, []);

  return (
    <div>
      <div id="map-container" className="w-full h-screen z-0 absolute top-0"></div>
      {/* Overlay untuk menampilkan informasi properti fitur yang diklik */}
      <div id="popup-container" className="ol-popup">
        <div id="popup-content"></div>
      </div>
    </div>
  );
};

export default MapPlain;
