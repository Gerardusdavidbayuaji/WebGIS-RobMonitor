import { HiOutlineGlobe } from "react-icons/hi";

const Navbar = () => {

  return (
    <nav className="bg-white text-black sticky top-0 z-50 flex items-center justify-between w-full px-6 py-3">
      <div className="flex items-center">
        <span><HiOutlineGlobe /></span>
        <div className="font-poppins text-2xl font-semibold">maprob</div>
      </div>

      <div className="flex items-center gap-5 text-black cursor-pointer">
        <p className="text-sm font-medium">Studio</p>
        <p className="text-sm font-medium mr-5">Insights</p>
        <div className="flex items-center gap-2 text-black cursor-pointer">
        <p className="text-sm font-medium">Log In</p>
        <button className="rounded-full text-white bg-[#007afc] hover:bg-[#1265ae] text-sm font-medium w-20 h-8">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
