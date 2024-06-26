import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";

import CustomSignInForm from "./CustomSignInForm";

interface Props {
  description: string;
  subtitle: string;
  title: string;
}

const SignInForm = (props: Props) => {
  const { title, subtitle, description } = props;

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <p className="text-sm font-medium hover:text-[#007afc] transition duration-300 ease-in-out">
            {title}
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{subtitle}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            <CustomSignInForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInForm;
