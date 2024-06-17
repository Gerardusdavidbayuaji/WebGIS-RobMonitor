import { Eye, TableProperties, Map } from "lucide-react";

interface CardParametersProps {
  title: string;
}

const CardParameter = (props: CardParametersProps) => {
  const { title } = props;
  return (
    <div className="w-full max-w-64 p-2 rounded-lg shadow-md bg-white z-10">
      <h2 className="text-base font-medium mb-4">{title}</h2>
      <div className="my-1 flex gap-2">
        <button className="bg-[#e6eefc] hover:bg-[#5f6e8c] rounded-md">
          <Eye className="my-1 mx-2" />
        </button>
        <button className="bg-[#e6eefc] hover:bg-[#5f6e8c] rounded-md">
          <TableProperties className="my-1 mx-2" />
        </button>
        <button className="bg-[#e6eefc] hover:bg-[#5f6e8c] rounded-md">
          <Map className="my-1 mx-2" />
        </button>
      </div>
    </div>
  );
};

export default CardParameter;
