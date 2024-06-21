import { Eye, Waypoints, Map } from "lucide-react";

interface CardParametersProps {
  title: string;
  isActive: boolean;
  onToggle: (param: string) => void;
  onEyeClick: (param: string) => void;
}

const CardParameter = (props: CardParametersProps) => {
  const { title, isActive, onToggle, onEyeClick } = props;

  const handleEyeclick = () => {
    onEyeClick(title);
  };

  return (
    <div className="w-full max-w-64 p-2 rounded-lg shadow-md bg-[#292929] border border-[#94949469] z-10">
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-base text-[#ff6d1f] font-semimedium mb-4">
          {title}
        </h2>
        <div className="my-1 flex gap-2">
          <button
            className={`rounded-md ${
              isActive
                ? "bg-[#ff6d1f] text-white"
                : "bg-[#e3e1dc98] hover:bg-[#94949469]"
            }`}
            onClick={handleEyeclick}
          >
            <Eye className="my-1 mx-2" />
          </button>
          <button className="bg-[#e3e1dc98] hover:bg-[#94949469] rounded-md">
            <Waypoints className="my-1 mx-2" />
          </button>
          <button
            className={`rounded-md ${
              isActive
                ? "bg-[#ff6d1f] text-white"
                : "bg-[#e3e1dc98] hover:bg-[#94949469]"
            }`}
            onClick={() => onToggle(title)}
          >
            <Map className="my-1 mx-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardParameter;
