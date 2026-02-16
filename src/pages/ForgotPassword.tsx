import { Card, CardContent } from "@/components/ui/card";

import loginImage from "../assets/images/login_page_Image.jpg";
import ForgotPasswordForm from "@/components/modules/Authentication/ForgotPasswordForm";


const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="flex flex-col gap-6 w-full max-w-sm md:max-w-4xl">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <ForgotPasswordForm />
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.95] dark:invert"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
