import LoginForm from "@/components/ui/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-slate-400">
      <h1 className="font-bold text-2xl">Login Form</h1>
      <LoginForm />
    </main>
  );
}
