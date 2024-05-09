import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-12 bg-[#292929]">
      <footer className="col-start-2 col-span-10 text-white">
        <div className="flex justify-between pt-24">
          <div>
            <button className="rounded-full text-white bg-[#007afc] hover:bg-[#1265ae] font-poppins text-lg font-medium w-36 h-10" onClick={() => navigate("work")}>Get Started</button>
          </div>
          <div className="font-poppins text-sm font-medium">
            Geospatial technology optimizes and analyzes performance, one map at a time. 
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
