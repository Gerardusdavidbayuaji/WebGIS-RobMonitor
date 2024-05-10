import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const MapPlain = () => {
  const [selectedDanger] = useState([
    "Bahaya Rob Tinggi",
    "Bahaya Rob Sedang",
    "Bahaya Rob Rendah",
  ]);
  const [dangerLayer, setDangerLayer] = useState<L.LayerGroup<any> | null>(
    null
  );
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  // const [showWMSBatasWilayah, setShowWMSBatasWilayah] = useState(false);
  const [showMediumDanger, setShowMediumDanger] = useState(true);
  const [showHighDanger, setShowHighDanger] = useState(true);
  const [showLowDanger, setShowLowDanger] = useState(true);
  const [showWMSLayer, setShowWMSLayer] = useState(false);

  useEffect(() => {
    const map = L.map("map").setView([-7.749, 113.422], 13);
    const baseMap = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    baseMap.addTo(map);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  // wfs bahaya rob
  useEffect(() => {
    const getDataGenangan = async () => {
      if (!mapInstance) return;

      const urlGenangan =
        "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agenangan_rob_jatim&outputFormat=application%2Fjson";

      try {
        const response = await axios.get(urlGenangan);
        const geoJsonData = response.data;

        // Inisialisasi array untuk menyimpan data yang akan ditampilkan pada peta
        const filteredFeatures = [];

        // Iterasi melalui setiap fitur dalam GeoJSON
        for (let i = 0; i < geoJsonData.features.length; i++) {
          const feature = geoJsonData.features[i];

          // Periksa apakah fitur sesuai dengan kriteria yang dipilih oleh pengguna
          for (let j = 0; j < selectedDanger.length; j++) {
            const dangerLevel = selectedDanger[j];
            if (
              dangerLevel === "All" ||
              (dangerLevel === "Bahaya Rob Rendah" &&
                showLowDanger &&
                feature.properties.layer === "Bahaya Rob Rendah") ||
              (dangerLevel === "Bahaya Rob Sedang" &&
                showMediumDanger &&
                feature.properties.layer === "Bahaya Rob Sedang") ||
              (dangerLevel === "Bahaya Rob Tinggi" &&
                showHighDanger &&
                feature.properties.layer === "Bahaya Rob Tinggi")
            ) {
              // Tambahkan fitur ke dalam array hasil filter
              filteredFeatures.push(feature);
              // Keluar dari loop saat satu bahaya cocok
              break;
            }
          }
        }

        // Hapus layer bahaya yang sudah ada jika ada
        if (dangerLayer) {
          dangerLayer.removeFrom(mapInstance);
        }

        // Buat layer baru dari data yang telah difilter
        // Buat layer baru dari data yang telah difilter
        const newDangerLayer = L.geoJson(filteredFeatures, {
          style: (feature) => {
            // Memastikan bahwa feature tidak undefined sebelum mengakses propertinya
            if (!feature || !feature.properties || !feature.properties.layer) {
              return {}; // Atau style default lainnya jika diperlukan
            }
            // Menggunakan warna berbeda berdasarkan tingkat bahaya
            let color;
            switch (feature.properties.layer) {
              case "Bahaya Rob Rendah":
                color = "green";
                break;
              case "Bahaya Rob Sedang":
                color = "yellow";
                break;
              case "Bahaya Rob Tinggi":
                color = "red";
                break;
              default:
                color = "blue";
            }
            return {
              color: color,
              fillOpacity: 0.5,
              weight: 0.3,
              opacity: 1,
            };
          },
          onEachFeature: function (feature, layer) {
            if (feature && feature.properties && feature.properties.layer) {
              layer.bindPopup(
                "luas: " +
                  feature.properties.Luas_m2 +
                  " status:" +
                  feature.properties.layer
              );
            }
          },
        }).addTo(mapInstance);

        // Perbarui state untuk menyimpan layer bahaya yang baru
        setDangerLayer(newDangerLayer);

        // Perbesar peta agar sesuai dengan batas layer bahaya yang baru
        mapInstance.fitBounds(newDangerLayer.getBounds());
      } catch (error) {
        console.log("Oops, something went wrong while fetching data", error);
      }
    };

    // Panggil fungsi untuk mendapatkan data GeoJSON ketika ada perubahan pada dependencies
    getDataGenangan();
  }, [
    selectedDanger,
    mapInstance,
    showHighDanger,
    showMediumDanger,
    showLowDanger,
  ]);

  // wms index bahaya rob
  useEffect(() => {
    const getWmsIndexBahayaRob = async () => {
      if (!mapInstance) return;

      const urlBahayaRob = "http://localhost:8080/geoserver/rob_jatim/wms";

      try {
        if (showWMSLayer) {
          const wmsLayer = L.tileLayer.wms(urlBahayaRob, {
            layers: "rob_jatim:bahaya_rob_jatim",
            format: "image/png",
            transparent: true,
            styles: "bahaya_rob",
          });
          wmsLayer.addTo(mapInstance);

          mapInstance.on("click", async (e) => {
            const urlGetBahayaRob = `${urlBahayaRob}?&styles=
            &service=WMS
            &version=1.1.0
            &srs=EPSG%3A4326
            &request=GetFeatureInfo
            &info_format=application/json
            &layers=rob_jatim%3Abahaya_rob_jatim
            &query_layers=rob_jatim%3Abahaya_rob_jatim
            &width=${mapInstance.getSize().x}
            &height=${mapInstance.getSize().y}
            &bbox=${mapInstance.getBounds().toBBoxString()}
            &x=${mapInstance.latLngToContainerPoint(e.latlng).x}
            &y=${mapInstance.latLngToContainerPoint(e.latlng).y}`;

            try {
              const response = await axios.get(urlGetBahayaRob);
              const geoJsonBahayaRob = response.data;
              const bahayaRobValue =
                geoJsonBahayaRob.features[0].properties.GRAY_INDEX;

              L.popup()
                .setLatLng(e.latlng)
                .setContent("Index: " + bahayaRobValue + " pixel")
                .openOn(mapInstance);
            } catch (error) {
              console.log(
                "Oops, something went wrong while fetching WMS data",
                error
              );
            }
          });
        } else {
          // Remove WMS layer if showWMSLayer is false
          mapInstance.eachLayer((layer) => {
            if (layer instanceof L.TileLayer.WMS) {
              mapInstance.removeLayer(layer);
            }
          });
        }
      } catch (error) {
        console.log(
          "Oops, something went wrong while fetching WMS data",
          error
        );
      }
    };

    getWmsIndexBahayaRob();

    return () => {
      if (mapInstance) {
        mapInstance.off("click");
      }
    };
  }, [mapInstance, showWMSLayer]);

  // wms batas wilayah
  // useEffect(() => {
  //   const getWmsBatasWilayah = async () => {
  //     if (!mapInstance) return;

  //     const urlBatasWilayah = "http://localhost:8080/geoserver/rob_jatim/wms?";

  //     try {
  //       if (showWMSBatasWilayah) {
  //         const layerBatasWilayah = L.tileLayer.wms(urlBatasWilayah, {
  //           layers: "rob_jatim:batas_wilayah",
  //           format: "image/png",
  //           transparent: true,
  //           styles: "batas_wilayah",
  //         });

  //         layerBatasWilayah.addTo(mapInstance);
  //       } else {
  //         // Remove WMS layer if showWMSBatasWilayah is false
  //         mapInstance.eachLayer((layer) => {
  //           if (layer instanceof L.TileLayer.WMS) {
  //             mapInstance.removeLayer(layer);
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.log(
  //         "Oops, something went wrong while fetching WMS data",
  //         error
  //       );
  //     }
  //   };

  //   getWmsBatasWilayah();
  // }, [mapInstance, showWMSBatasWilayah]);

  const handleWMSLayerToggle = () => {
    setShowWMSLayer(!showWMSLayer);
  };

  const handleHighDangerToggle = () => {
    setShowHighDanger(!showHighDanger);
  };

  const handleMediumDangerToggle = () => {
    setShowMediumDanger(!showMediumDanger);
  };

  const handleLowDangerToggle = () => {
    setShowLowDanger(!showLowDanger);
  };

  // const handleWMSBatasWilayahToggle = () => {
  //   setShowWMSBatasWilayah(!showWMSBatasWilayah);
  // };

  return (
    <section>
      <div className="flex flex-col bg-[#FAFAF9] w-60 h-52 font-poppins z-20 absolute rounded-md m-2">
        <div className="m-2">
          <div>
            <h2>WFS: Bahaya Rob</h2>
            <hr />
            <input
              type="checkbox"
              id="toggleHighDanger"
              checked={showHighDanger}
              onChange={handleHighDangerToggle}
            />
            <label htmlFor="toggleHighDanger">Bahaya Rob Tinggi</label>
            <br />
            <input
              type="checkbox"
              id="toggleMediumDanger"
              checked={showMediumDanger}
              onChange={handleMediumDangerToggle}
            />
            <label htmlFor="toggleMediumDanger">Bahaya Rob Sedang</label>
            <br />
            <input
              type="checkbox"
              id="toggleLowDanger"
              checked={showLowDanger}
              onChange={handleLowDangerToggle}
            />
            <label htmlFor="toggleLowDanger">Bahaya Rob Rendah</label>
          </div>
          <div className="mt-2">
            <h2>WMS : Index Bahaya Rob</h2>
            <hr />
            <input
              type="checkbox"
              id="toggleWMSLayer"
              checked={showWMSLayer}
              onChange={handleWMSLayerToggle}
            />
            <label htmlFor="toggleWMSLayer">Index</label>
            <br />
            {/* <input
              type="checkbox"
              id="toggleWMSBatasWilayah"
              checked={showWMSBatasWilayah}
              onChange={handleWMSBatasWilayahToggle}
            />
            <label htmlFor="toggleWMSBatasWilayah">Batas Wilayah</label> */}
          </div>
        </div>
      </div>
      <div className="w-full h-screen z-0 absolute top-0">
        <div id="map"></div>
      </div>
    </section>
  );
};

export default MapPlain;
