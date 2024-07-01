import { useNavigate } from "react-router-dom";

import { HiOutlineGlobe } from "react-icons/hi";
import { Layers } from "lucide-react";

import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

const CardBaseMap = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed flex items-center justify-between top-0 left-0 right-0 p-4 z-10 w-full">
      <div className="flex items-center">
        <span>
          <HiOutlineGlobe color="#ff6d1f" />
        </span>
        <div
          className="font-poppins text-3xl font-semibold cursor-pointer text-[#ff6d1f]"
          onClick={() => navigate("/")}
        >
          maprob
        </div>
      </div>

      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-2 bg-[#292929] border border-[#94949469] rounded-md">
              <Layers className="h-5 w-5" color="#94949469" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#292929] border border-[#94949469] mr-4 mt-2">
            <div className="flex">
              <DropdownMenuItem>
                <div className="items-center justify-center cursor-pointer">
                  <img
                    src="/assets/street_map.png"
                    className="h-10 w-10 rounded-md"
                  />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="items-center justify-center cursor-pointer">
                  <img
                    src="/assets/osm_map.png"
                    className="h-10 w-10 rounded-md"
                  />
                </div>
              </DropdownMenuItem>
            </div>
            <div className="flex">
              <DropdownMenuItem>
                <div className="items-center justify-center cursor-pointer">
                  <img
                    src="/assets/light_map.png"
                    className="h-10 w-10 rounded-md"
                  />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="items-center justify-center cursor-pointer">
                  <img
                    src="/assets/satellite_map.png"
                    className="h-10 w-10 rounded-md"
                  />
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CardBaseMap;
