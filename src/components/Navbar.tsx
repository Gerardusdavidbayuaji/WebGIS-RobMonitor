import { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const mapRef = useRef<any>(null);
  const coordinateKraksaan = [1359477416282.8428, -863822.8494639626];

  function zoomToKraksaan() {
    if (mapRef.current) {
      mapRef.current.getView().animate({
        center: coordinateKraksaan,
        duration: 3000,
        zoom: 14,
      });
    }
  }

  return (
    <nav className="bg-gray-600 text-white sticky top-0 z-50 flex items-center justify-between w-full px-6 py-3 bg-opacity-80 backdrop-blur h-[60px]">
      <p className="font-bold">
        Rob<span className="font-extralight">Monitor</span>
      </p>

      <Link
        to="/work"
        onClick={() => {
          zoomToKraksaan;
        }}
      >
        <p className="font-extralight unThin">RobDashboard</p>
      </Link>
    </nav>
  );
};

export default Navbar;
