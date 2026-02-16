import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Logo from "../../../assets/images/logo.png";
import { Label } from "@/components/ui/label";

const ForgotPasswordForm = () => {
    return (
        <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center mb-2">
                <a href="/" className="flex items-center gap-2 font-medium">
                  <div className="flex items-center justify-center rounded-md">
                    <img src={Logo} alt="Mon Bhalo Logo" className="h-40 w-40" />
                  </div>
                </a>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Forgot your password?</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your email to reset your account password
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Send Reset Link
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Back to sign in
                </Link>
              </div>
            </div>
          </form>
    );
};

export default ForgotPasswordForm;