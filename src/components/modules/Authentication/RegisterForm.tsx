import Logo from "../../../assets/images/logo.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaGoogle } from "react-icons/fa";
import Password from "@/components/ui/password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

/* ============================
   ZOD SCHEMA
============================ */

const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .max(50, { message: "First name cannot exceed 50 characters." }),

    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .max(50, { message: "Last name cannot exceed 50 characters." }),

    dob: z
  .string()
  .min(1, { message: "Please select your date of birth." }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      error: "Please select a valid gender.",
    }),

    email: z
      .email({ message: "Invalid email address format." })
      .min(5)
      .max(100),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, { message: "Must contain at least 1 uppercase letter." })
      .regex(/[!@#$%^&*]/, {
        message: "Must contain at least 1 special character.",
      })
      .regex(/\d/, { message: "Must contain at least 1 number." }),

    confirmPassword: z.string().min(8, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

/* ============================
   COMPONENT
============================ */

const RegisterForm = () => {
  const [register ] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      gender: undefined,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const userInfo = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
      dob: data.dob,
      gender: data.gender,
    };

    try {
      const result = await register(userInfo).unwrap();
      toast.success(result.data.message || "Registration successful! Please log in.");
      navigate("/verify");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      toast.error(error.data?.message || "Registration failed. Please try again.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="p-6 md:p-8 z-20">
      <div className="flex  flex-col gap-6">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img src={Logo} alt="Mon Bhalo Logo" className="h-40 w-40" />
          </Link>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">
            Enter your information to create a new account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DOB + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Genders</SelectLabel>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Create Account
            </Button>
          </form>
        </Form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
        >
          <FaGoogle className="mr-1" />
          Login with Google
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
