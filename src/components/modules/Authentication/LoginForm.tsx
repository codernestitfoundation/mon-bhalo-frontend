import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import Password from "@/components/ui/password";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import config from "@/config";




const loginFormSchema = z.object({ 
  email: z
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ error: "Password must be string." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});

const LoginForm = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(userInfo).unwrap();
      toast.success(result.data.message || "Login successful! Welcome back.");
      navigate("/")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      if (error.data?.message === "User email is not verified. Please verify your email to proceed.") {
        navigate("/verify", {state: data.email});
        return;
      }
      toast.error(error.data?.message || "Login failed. Please check your credentials and try again.");
      console.error("Login failed:", error);

    }
  };
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center mb-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className=" text-primary-foreground flex items-center justify-center rounded-md">
              <img src={Logo} alt="Mon Bhalo Logo" className="h-40 w-40" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">
            Login to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className=" text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
          onClick={()=>window.open(`${config.baseURL}/auth/google`)}
        >
          <FaGoogle className="mr-1" />
          Login with Google
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
