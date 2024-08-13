"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/custom/CustomInput";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/User";
import { useToast } from "../use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login(values);
    console.log(response);

    if (response.success) {
      localStorage.setItem("token", response.jwtToken);

      console.log("token", localStorage.getItem("token"));

      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });

      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        duration: 3000,
      });
    }
  }

  return (
    <div className="w-[360px] bg-slate-200 p-6 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomInput
            form={form}
            type="email"
            name="email"
            label="Email"
            placeholder="email "
          />
          <CustomInput
            form={form}
            type="password"
            name="password"
            label="Password"
            placeholder="password"
          />
          <Button type="submit" className="w-full mx-auto">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
