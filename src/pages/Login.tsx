import { Card, CardContent } from "@/components/ui/card";
import loginImage from "../assets/images/login_page_Image.jpg";
import LoginForm from "@/components/modules/Authentication/LoginForm";

const Login = () => {
  return (
    <section className="bg-primary dark:bg-background min-h-screen items-center relative">
      <div className="pointer-events-none absolute inset-0 right-0 overflow-hidden md:block hidden">
        <div className="absolute left-1/1 top-0 h-[2600px] w-[2600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        <div className="absolute left-1/1 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary dark:bg-background" />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <div className="flex flex-col gap-6">
              <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                  <LoginForm />
                  <div className="bg-muted relative hidden md:block">
                    <img
                      src={loginImage}
                      alt="Image"
                      className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.95] dark:invert"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="text-white/60 *:[a]:hover:text-chart-5 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Login;
