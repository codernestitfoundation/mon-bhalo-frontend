import Logo from "../assets/images/logo.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { Dot } from "lucide-react";

/* ============================
   Schema
============================ */

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits." })
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

/* ============================
   Component
============================ */

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(120);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP")
    setTimer(120);
    try {
      const res = await sendOtp({ email }).unwrap();
      if (res.success) {
        toast.success("OTP Send", {id: toastId});
        setConfirmed(true);
       
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const handleSubmit = async (values: OtpFormValues) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: values.otp,
    };
    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified Successfully", { id: toastId });
         navigate("/login")
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }
    const timerId = setInterval(() => {
      if (email && confirmed) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <section className="bg-primary dark:bg-background min-h-screen flex items-center relative">
      <div className="pointer-events-none absolute inset-0 right-0 overflow-hidden md:block hidden">
        <div className="absolute left-1/1 top-0 h-[2600px] w-[2600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        <div className="absolute left-1/1 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary dark:bg-background" />
      </div>

      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        {confirmed ? (
          <Card className="px-6 py-8 sm:p-12 relative">
            <CardHeader className="text-center gap-6 p-0">
              <div className="mx-auto">
                <Link to="/">
                  <div className="text-primary-foreground flex items-center justify-center rounded-md">
                    <img
                      src={Logo}
                      alt="Mon Bhalo Logo"
                      className="h-40 w-40"
                    />
                  </div>
                </Link>
              </div>

              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-medium text-card-foreground">
                  Verify your email
                </CardTitle>
                <CardDescription className="text-sm font-normal text-muted-foreground">
                  Enter the verification code we sent to your email address{" "}
                  <span className="font-medium">{email}</span>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="grid gap-6"
                >
                  <FieldGroup className="items-center">
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={field.onChange}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                              </InputOTPGroup>
                              {/* <InputOTPSeparator /> */}
                              <Dot />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              {/* <InputOTPSeparator /> */}
                              <Dot />
                              <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Field className="gap-4">
                      <Button type="submit" size="lg" className="rounded-xl">
                        Verify Now
                      </Button>

                      <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                        Didn&apos;t get the email?{" "}
                        <span
                          className={timer !== 0 ? "cursor-not-allowed" : ""}
                        >
                          <Button
                            onClick={handleSendOtp}
                            type="button"
                            variant="link"
                            className="font-medium text-card-foreground text-red-800 p-0 mx-1 disabled:pointer-events-none"
                            disabled={timer !== 0}
                          >
                            Resend OTP :
                          </Button>
                        </span>
                        {timer}
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Card className="px-6 py-8 sm:p-12 relative">
            <CardHeader className="text-center gap-6 p-0">
              <div className="mx-auto">
                <Link to="/">
                  <div className="text-primary-foreground flex items-center justify-center rounded-md">
                    <img
                      src={Logo}
                      alt="Mon Bhalo Logo"
                      className="h-40 w-40"
                    />
                  </div>
                </Link>
              </div>

              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-medium text-card-foreground">
                  Verify your email
                </CardTitle>
                <CardDescription className="text-sm font-normal text-muted-foreground">
                  A verification code has been sent to{" "}
                  <span className="font-medium">{email}</span>. Please check
                  your inbox and enter the code below to complete your account
                  verification.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <FieldGroup className="items-center">
                <Field className="gap-4">
                  <Button
                    onClick={handleSendOtp}
                    size="lg"
                    className="rounded-xl"
                  >
                    Confirm
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default VerifyEmail;
