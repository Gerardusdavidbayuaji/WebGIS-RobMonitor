interface ParameterProps {
  logo: any;
  parameter: string;
  onClick?: () => void;
}

const CustomParameter = (props: ParameterProps) => {
  const { logo, parameter, onClick } = props;

  return (
    <div
      className="flex items-center gap-2 w-full mb-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2 bg-[#1265AE] text-white w-fit h-fit rounded-lg">
        {logo}
      </div>
      <p className="w-full text-base font-medium hover:bg-[#E4ECF1] rounded-md py-1 pl-2">
        {parameter}
      </p>
    </div>
  );
};

export default CustomParameter;
