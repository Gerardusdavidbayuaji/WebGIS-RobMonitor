import { Layers } from "lucide-react";

import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

const CardBaseMap = () => {
  return (
    <div className="fixed flex items-center justify-between top-0 left-0 right-0 p-4 z-10 w-full">
      <div>
        <button>Home</button>
      </div>

      <div>
        <input type="text" className="border" />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 bg-white rounded-md">
            <Layers className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-14">
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
  );
};

export default CardBaseMap;
