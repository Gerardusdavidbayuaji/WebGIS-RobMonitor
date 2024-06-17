import CardParameter from "@/components/CardParameter";
import CardBaseMap from "@/components/CardBaseMap";
import Basemap from "@/components/Basemap";

const MapPlain = () => {
  return (
    <div className="relative min-h-screen">
      <Basemap />
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10 mb-2">
        <div className="flex space-x-4 overflow-x-auto">
          <CardParameter title="Bahaya Rob Rendah" />
          <CardParameter title="Bahaya Rob Sedang" />
          <CardParameter title="Bahaya Rob Rendah" />
          <CardParameter title="Persil Bangunan" />
          <CardParameter title="Batas Kecamatan" />
          <CardParameter title="Sungai" />
        </div>
      </div>
      <CardBaseMap />
      {/* <div className="fixed top-0 left-0 p-4 z-10">
        <div className="h-10 w-1/4 min-w-[240px] bg-white rounded-lg">
          <p className="flex items-center justify-center">home</p>
        </div>
      </div> */}
      <div className="fixed top-14 right-0 p-4 z-10">
        <div className="h-4/6 min-h-[525px] w-1/4 min-w-[237px] bg-white rounded-lg">
          <p className="flex items-center justify-center">sidebar</p>
        </div>
      </div>
    </div>
  );
};

export default MapPlain;
