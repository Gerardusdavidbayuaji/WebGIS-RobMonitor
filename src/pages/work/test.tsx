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
  const [bangunanLayer, setBangunanLayer] = useState<L.LayerGroup<any> | null>(
    null
  );

  const [sungaiLayer, setSungaiLayer] = useState<L.Layer | null>(null);

  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [showKantorPemerintahan, setShowKantorPemerintahan] = useState(false);
  const [showTempatIbadah, setShowTempatIbadah] = useState(false);
  const [showPerdagangan, setShowPerdagangan] = useState(false);
  const [showPemukiman, setShowPemukiman] = useState(false);
  const [showIndustri, setShowIndustri] = useState(false);
  const [showSungai, setShowSungai] = useState(false);

  const [showMediumDanger, setShowMediumDanger] = useState(true);
  const [showHighDanger, setShowHighDanger] = useState(true);
  const [showLowDanger, setShowLowDanger] = useState(true);
  const [showWMSLayer, setShowWMSLayer] = useState(false);

  //basemape
  useEffect(() => {
    const map = L.map("map").setView([-7.749, 113.422], 10);
    const baseMap = L.tileLayer(
      "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}@2x.png?key=AW8IuG306IIk8kNdxEw6",
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }
    );

    baseMap.addTo(map);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  //wfs
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

    getDataGenangan();
  }, [
    mapInstance,
    showLowDanger,
    showHighDanger,
    selectedDanger,
    showMediumDanger,
  ]);

  useEffect(() => {
    const getDataSungai = async () => {
      if (!mapInstance) return;
      const urlSungai =
        "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Asungai&outputFormat=application%2Fjson";

      try {
        const responseSungai = await axios.get(urlSungai);
        const geoJsonDataSungai = responseSungai.data;

        // Hapus layer sungai yang sudah ada jika ada
        if (sungaiLayer) {
          sungaiLayer.removeFrom(mapInstance); // Hapus dari layer control
          mapInstance.removeLayer(sungaiLayer); // Hapus dari peta
        }

        // Tampilkan data sungai hanya jika checkbox sungai dicentang
        if (showSungai) {
          const newSungaiLayer = L.geoJSON(geoJsonDataSungai, {
            style: {
              color: "blue",
              weight: 1,
              opacity: 1,
            },
            onEachFeature: function (feature, layer) {
              if (feature && feature.properties && feature.properties.NAMOBJ) {
                layer.bindPopup("sungai: " + feature.properties.NAMOBJ);
              }
            },
          }).addTo(mapInstance);

          setSungaiLayer(newSungaiLayer);
        }
      } catch (error) {
        console.log(
          "Oops, something went wrong while fetching sungai data",
          error
        );
      }
    };

    getDataSungai();
  }, [mapInstance, showSungai, sungaiLayer]);

  useEffect(() => {
    const getDataBangunan = async () => {
      if (!mapInstance) return;
      const urlBangunan =
        "http://localhost:8080/geoserver/rob_jatim/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Abangunan&outputFormat=application%2Fjson";

      try {
        const responseBangunan = await axios.get(urlBangunan);
        const geoJsonDataBangunan = responseBangunan.data;

        const filteredFeatures = geoJsonDataBangunan.features.filter(
          (feature: { properties: { Tipe_Bangu: any } }) => {
            const tipeBangunan = feature?.properties?.Tipe_Bangu;

            // Tambahkan logika untuk mengecek status checkbox dan jenis bangunan
            return (
              (showIndustri && tipeBangunan === "Industri/Gedung") ||
              (showPemukiman && tipeBangunan === "Pemukiman") ||
              (showPerdagangan && tipeBangunan === "Perdagangan/Jasa") ||
              (showTempatIbadah && tipeBangunan === "Tempat Ibadah") ||
              (showKantorPemerintahan && tipeBangunan === "Kantor Pemeintahan")
            );
          }
        );

        // Hapus layer bangunan yang sudah ada jika ada
        // Anda dapat menambahkan ini setelah mendapatkan daftar fitur yang difilter
        if (bangunanLayer) {
          bangunanLayer.removeFrom(mapInstance);
        }

        // Buat layer baru dari data yang telah difilter
        const newBangunanLayer = L.geoJSON(filteredFeatures, {
          style: (feature) => {
            let color;
            switch (feature?.properties?.Tipe_Bangu) {
              case "Industri/Gedung":
                color = "#86469C";
                break;
              case "Pemukiman":
                color = "#BC7FCD";
                break;
              case "Perdagangan/Jasa":
                color = "#FB9AD1";
                break;
              case "Tempat Ibadah":
                color = "#FFCDEA";
                break;
              case "Kantor Pemeintahan":
                color = "#99BC85";
                break;
              default:
                color = "blue";
            }
            return {
              color: color,
              fillOpacity: 0.5,
              weight: 1,
              opacity: 1,
            };
          },
          onEachFeature: function (feature, layer) {
            if (
              feature &&
              feature.properties &&
              feature.properties.Tipe_Bangu
            ) {
              layer.bindPopup("bangunan: " + feature.properties.Tipe_Bangu);
            }
          },
        }).addTo(mapInstance);

        // Perbarui state untuk menyimpan layer bangunan yang baru
        setBangunanLayer(newBangunanLayer);

        // Perbesar peta agar sesuai dengan batas layer bangunan yang baru
        mapInstance.fitBounds(newBangunanLayer.getBounds());
      } catch (error) {
        console.log(
          "Oops, something went wrong while fetching Bangunan data",
          error
        );
      }
    };

    getDataBangunan();
  }, [
    mapInstance,
    showIndustri,
    showPemukiman,
    showPerdagangan,
    showTempatIbadah,
    showKantorPemerintahan,
  ]);

  // wms
  useEffect(() => {
    const getWmsIndexBahayaRob = async () => {
      if (!mapInstance) return;

      const urlBahayaRob = "http://localhost:8080/geoserver/rob_jatim/wms";

      try {
        if (showWMSLayer) {
          const wmsLayer = L.tileLayer.wms(urlBahayaRob, {
            layers: "rob_jatim:index_genangan",
            format: "image/png",
            transparent: true,
            styles: "sld_genangan",
          });
          wmsLayer.addTo(mapInstance);

          mapInstance.on("click", async (e) => {
            const urlGetBahayaRob = `${urlBahayaRob}?&styles=
            &service=WMS
            &version=1.1.0
            &srs=EPSG%3A4326
            &request=GetFeatureInfo
            &info_format=application/json
            &layers=rob_jatim%3Aindex_genangan
            &query_layers=rob_jatim%3Aindex_genangan
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

  const handleSungaiToggle = () => {
    setShowSungai(!showSungai);
  };

  const handleIndustriToggle = () => {
    setShowIndustri(!showIndustri);
  };

  const handlePemukimanToggle = () => {
    setShowPemukiman(!showPemukiman);
  };

  const handlePerdaganganToggle = () => {
    setShowPerdagangan(!showPerdagangan);
  };

  const handleTempatIbadahToggle = () => {
    setShowTempatIbadah(!showTempatIbadah);
  };

  const handleKantorPemerintahanToggle = () => {
    setShowKantorPemerintahan(!showKantorPemerintahan);
  };

  const handleDownloadWFSData = () => {
    const urlBahayaRobDownload =
      "http://localhost:8080/geoserver/rob_jatim/ows";

    const downloadUrl = `${urlBahayaRobDownload}?service=WFS&version=1.0.0&request=GetFeature&typeName=rob_jatim%3Agenangan_rob_jatim&maxFeatures=50&outputFormat=shape-zip`;

    window.open(downloadUrl, "_blank");
  };

  return (
    <section>
      <div className="flex flex-col bg-white w-60 h-full font-poppins z-20 absolute">
        <div className="m-2">
          <div>
            <h2>WFS</h2>
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
            <br />
            <button onClick={handleDownloadWFSData}>Download Bahaya Rob</button>
            <br />
            <input
              type="checkbox"
              id="toggleSungai"
              checked={showSungai}
              onChange={handleSungaiToggle}
            />
            <label htmlFor="toggleSungai">Sungai</label>
            <br />
            <input
              type="checkbox"
              id="toggleIndustri"
              checked={showIndustri}
              onChange={handleIndustriToggle}
            />
            <label htmlFor="toggleIndustri">Industri/Gedung</label>
            <br />
            <input
              type="checkbox"
              id="togglePemrintahan"
              checked={showKantorPemerintahan}
              onChange={handleKantorPemerintahanToggle}
            />
            <label htmlFor="togglePemrintahan">Kantor Pemerintahan</label>
            <br />
            <input
              type="checkbox"
              id="togglePemukiman"
              checked={showPemukiman}
              onChange={handlePemukimanToggle}
            />
            <label htmlFor="togglePemukiman">Pemukiman</label>
            <br />
            <input
              type="checkbox"
              id="togglePerdagangan"
              checked={showPerdagangan}
              onChange={handlePerdaganganToggle}
            />
            <label htmlFor="togglePerdagangan">Perdagangan</label>
            <br />
            <input
              type="checkbox"
              id="toggleTempatIbadah"
              checked={showTempatIbadah}
              onChange={handleTempatIbadahToggle}
            />
            <label htmlFor="toggleTempatIbadah">Tempat Ibadah</label>
          </div>
          <div className="mt-2">
            <h2>WMS</h2>
            <hr />
            <input
              type="checkbox"
              id="toggleWMSLayer"
              checked={showWMSLayer}
              onChange={handleWMSLayerToggle}
            />
            <label htmlFor="toggleWMSLayer">Index</label>
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
