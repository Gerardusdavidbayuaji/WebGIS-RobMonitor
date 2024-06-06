import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";

import CustomSignUpForm from "./CustomSignUpForm";

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
          <p className="text-sm font-medium">{title}</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{subtitle}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            <CustomSignUpForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInForm;
