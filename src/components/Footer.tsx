import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="grid grid-cols-12 bg-[#FAFAF9]">
      <footer className="col-start-2 col-span-10 text-gray-600">
        <div className="flex justify-between pt-24">
          <div className="font-poppins text-sm font-medium">
            Indonesia's Leading Geospasial <br /> Technology that optimize
            analytics <br /> and performance, moving the world <br /> one map an
            a time.
          </div>

          <div className="flex gap-5">
            <div>
              <p className="font-poppins text-lg font-medium">Product</p>
              <Link to="/work">
                <p className="font-poppins text-sm font-medium unThin">
                  RobDashboard
                </p>
              </Link>
            </div>
            <div>
              <p className="font-poppins text-lg font-medium">Company</p>
              <p className="font-poppins text-sm font-medium unThin">
                Contact Us
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-gray-600 h-[1px] my-5" />
        <p className="flex justify-center font-poppins text-sm font-medium pb-5">
          © 2024 - RobMonitor
        </p>
      </footer>
    </div>
  );
};

export default Footer;
