import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUserLogin } from "@/lib/react-query/queries";
import { signinForm } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useAuth();

  const form = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: userLogin, isPending: isLoggingIn } = useUserLogin();
  async function onSubmit(user: z.infer<typeof signinForm>) {
    const newUser = await userLogin(user);
    if (!newUser) {
      toast({ title: "Signin Failed. Please try again." });
      return;
    }
    await checkAuthUser();
    navigate("/");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card">
        <div className="logo">
          <p>Snapgram</p>
        </div>
        <p className="text-gray-500 text-sm">
          Welcome back, please enter your details.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isLoggingIn ? "Signing in" : "Signin"}
            </Button>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link className="text-blue-500 font-bold" to="/signup">
                Signup
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
