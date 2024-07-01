import { Eye, Download, Map } from "lucide-react";

interface CardParametersProps {
  title: string;
  isActive: boolean;
  onToggle: (param: string) => void;
  onEyeClick: (param: string) => void;
}

const CardParameter = (props: CardParametersProps) => {
  const { title, isActive, onToggle } = props;

  return (
    <div className="w-full max-w-64 p-2 rounded-lg shadow-md bg-[#292929] border border-[#94949469] z-10">
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-base text-[#ff6d1f] lg:font-medium md:font-ligh sm:font-light mb-4">
          {title}
        </p>
        <div className="my-1 flex gap-2">
          <button
            className={`rounded-md ${
              isActive
                ? "bg-[#94949469] text-white"
                : "bg-[#e3e1dc98] hover:bg-[#94949469]"
            }`}
            onClick={() => onToggle(title)}
          >
            <Eye className="my-1 mx-2" />
          </button>
          <button className="bg-[#e3e1dc98] hover:bg-[#94949469] rounded-md">
            <Map className="my-1 mx-2" />
          </button>
          <button className="bg-[#e3e1dc98] hover:bg-[#94949469] rounded-md">
            <Download className="my-1 mx-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardParameter;
