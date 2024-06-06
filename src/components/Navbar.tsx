import { useNavigate } from "react-router-dom";
import { HiOutlineGlobe } from "react-icons/hi";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "@/components/ui/button";
import SignInForm from "./form/SignInForm";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = () => {
    // Add your register logic here
    toast({
      variant: "destructive",
      title: "Registered",
      description: "Your account has been created.",
    });
  };

  return (
    <nav className="bg-white text-black sticky top-0 z-50 flex items-center justify-between w-full px-6 py-3">
      <div className="flex items-center">
        <span>
          <HiOutlineGlobe />
        </span>
        <div className="font-poppins text-2xl font-semibold">maprob</div>
      </div>

      <div className="flex items-center gap-5 text-black cursor-pointer">
        <p className="text-sm font-medium" onClick={() => navigate("/studio")}>
          Studio
        </p>
        <p className="text-sm font-medium" onClick={() => navigate("/insight")}>
          Insights
        </p>
        <div className="flex items-center gap-2 text-black cursor-pointer">
          <SignInForm
            title="Sign In"
            subtitle="Sign In Account"
            description="Sign in to your account using email"
          />
          <Dialog>
            <DialogTrigger>
              <button className="rounded-full text-white bg-[#007afc] hover:bg-[#1265ae] text-sm font-medium w-20 h-8">
                Sign Up
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register Account</DialogTitle>
                <DialogDescription>
                  Register your account now to get full access
                </DialogDescription>
                <div className="grid w-full items-center gap-1.5 pt-4">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5 pt-4 pb-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="johndoe@gmail.com"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5 pt-4 pb-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Maximum 8 character"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5 pt-4 pb-3">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="rounded-lg w-24 bg-[#292929]"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
