import { useNavigate } from "react-router-dom";
import { HiOutlineGlobe } from "react-icons/hi";

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

const Navbar = () => {
  const navigate = useNavigate();

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
          <Dialog>
            <DialogTrigger>
              <p className="text-sm font-medium">Log In</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Login Account</DialogTitle>
                <DialogDescription>
                  Login to your account using email
                </DialogDescription>
                <div className="grid w-full items-center gap-1.5 pt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="johndue@gmail.com"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5 pt-4 pb-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password 8 character"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="rounded-lg w-24 bg-[#292929]">
                    Login
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
                  Register your account now to get full acces
                </DialogDescription>
                <div className="grid w-full items-center gap-1.5 pt-4">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="name"
                    id="name"
                    placeholder="John Due"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5 pt-4 pb-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="jhondue@gmail.com"
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
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Confirm password"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="rounded-lg w-24 bg-[#292929]">
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
