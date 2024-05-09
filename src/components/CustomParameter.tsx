import { Checkbox } from "./ui/checkbox";

interface ParameterProps {
  logo: any;
  parameter: string;
  onClick?: () => void;
}

const CustomParameter = (props: ParameterProps) => {
  const { logo, parameter, onClick } = props;

  return (
    <div>
      <div
        className="flex items-center gap-2 w-full cursor-pointer"
        onClick={onClick}
      >
        <div className="p-2 bg-[#007afc] text-white w-fit h-fit rounded-lg">
          {logo}
        </div>
        <p className="w-full text-base font-medium hover:bg-[#E4ECF1] rounded-md py-1 pl-2">
          {parameter}
        </p>
      </div>

      <div className="mt-1 mb-4 ml-12 flex items-center">
        <Checkbox id="toggleHighDanger"/>
        <label htmlFor="toggleHighDanger" className="ml-1 text-xs">tes checkbox data</label>
      </div>
    </div>
  );
};

export default CustomParameter;
