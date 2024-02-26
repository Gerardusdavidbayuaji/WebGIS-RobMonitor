import { FiSearch } from "react-icons/fi";

const SearchData = () => {
  return (
    <div>
      <div className="bg-white rounded-lg p-1 border border-solid">
        <div className="flex gap-4 items-center pr-4">
          <FiSearch color="black" />
          <input
            type="search"
            placeholder="Search Data Layers"
            className="bg-transparent outline-none text-black text-sm w-full placeholder:text-sm placeholder:italic"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchData;
