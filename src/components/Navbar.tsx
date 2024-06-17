import { useNavigate } from "react-router-dom";
import { HiOutlineGlobe } from "react-icons/hi";
import SignInForm from "./form/SignInForm";
import SignUpForm from "./form/SignUpForm";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white text-black sticky top-0 z-50 flex items-center justify-between w-full px-6 py-3">
      <div className="flex items-center">
        <span>
          <HiOutlineGlobe />
        </span>
        <div
          className="font-poppins text-2xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          maprob
        </div>
      </div>

      <div className="flex items-center gap-5 text-black cursor-pointer">
        <div className="flex items-center gap-2 text-black cursor-pointer">
          <SignInForm
            title="Sign In"
            subtitle="Sign In Account"
            description="Sign in to your account using email"
          />
          <div className="flex items-center justify-center rounded-full text-white bg-[#007afc] hover:bg-[#1265ae] text-sm font-medium w-20 h-8 cursor-pointer">
            <SignUpForm
              title="Sign Up"
              subtitle="Sign Up Account"
              description="Sign up your account now to get full access"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
