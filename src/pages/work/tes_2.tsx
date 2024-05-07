import { useState, useEffect, useRef } from "react";

import { getGenanganRob } from "@/utils/apis/work";
import { transform } from "ol/proj";
import { Geometry } from "ol/geom";
import { Feature } from "ol";

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import Map from 'ol/Map';
import "ol/ol.css";

const MapPlain = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature<Geometry> | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource<Feature<Geometry>>> | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const overlayRef = useRef<Overlay | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const genanganRobDataRef = useRef<any>(null);

  useEffect(() => {
    const fetchDataAndCreateMap = async () => {
      try {
        const genanganRobData = await getGenanganRob();
        console.log(genanganRobData);
        genanganRobDataRef.current = genanganRobData;

        const validFeatures = genanganRobData.features.filter((feature: any) => {
          return feature.geometry && feature.geometry.type; // Memeriksa apakah jenis geometri tersedia
        });

        const geojsonFormat = new GeoJSON();
        const vectorSource = new VectorSource({
          features: geojsonFormat.readFeatures({ type: 'FeatureCollection', features: validFeatures }, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857',
          }) as Feature<Geometry>[],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        vectorLayerRef.current = vectorLayer;

        const mapInstance = new Map({
          target: 'map-container',
          view: new View({
            center: transform([113.429, -7.751], 'EPSG:4326', 'EPSG:3857'),
            zoom: 13,
          }),
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=AW8IuG306IIk8kNdxEw6',
                attributions: '© <a href="https://www.maptiler.com/copyright/">MapTiler</a>, © OpenStreetMap contributors',
              }),
            }),
            vectorLayer,
          ],
        });

        mapInstanceRef.current = mapInstance;

        const overlay = new Overlay({
          element: document.getElementById('popup')!,
          autoPan: {
            animation: {
              duration: 250,
            },
          },
        });

        overlayRef.current = overlay;
        mapInstance.addOverlay(overlay);

        mapInstance.on('singleclick', function (evt) {
          const features = mapInstance.getFeaturesAtPixel(evt.pixel);
          
          if (features.length > 0) {
            const clickedFeature = features[0] as Feature<Geometry>; // Explicit cast
            setSelectedFeature(clickedFeature);

            // Update overlay position
            overlay.setPosition(evt.coordinate);
          }
        });                 
      } catch (error: any) {
        console.error('Oops, something went wrong', error.message);
      }
    };

    fetchDataAndCreateMap();
  }, []);

  useEffect(() => {
    // Filter features when searchQuery changes
    if (genanganRobDataRef.current) {
      const filteredData = genanganRobDataRef.current.features.filter((feature: any) => {
        // Example filtering logic, adjust as needed
        return feature.properties.layer.toLowerCase().includes(searchQuery.toLowerCase());
      });

      const geojsonFormat = new GeoJSON();
      const filteredFeatures = geojsonFormat.readFeatures(filteredData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }) as Feature<Geometry>[];

      vectorLayerRef.current?.setSource(new VectorSource({ features: filteredFeatures }));
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section>
      <div id="map-container" className="w-full h-screen"></div>
      <div className="absolute top-0 right-0 p-4">
        <input
          type="text"
          placeholder="Search by layer..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-2 py-1 rounded border"
        />
      </div>
      {selectedFeature && (
        <div id="popup" className="absolute bg-white p-2 shadow-md m-2 rounded-md bottom-0 left-0">
          <p>Luas (m²): {selectedFeature.get('Luas_m2')}</p>
          <p>status: {selectedFeature.get('layer')}</p>
        </div>
      )}
    </section>
  );
};

export default MapPlain;
