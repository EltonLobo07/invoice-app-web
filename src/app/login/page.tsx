import { AuthLayout } from "@/components/auth";
import { LoginForm } from "./LoginForm";

export default function Page() {
  return (
    <AuthLayout
      heading="Sign in"
      alternative={{
        href: "/signup",
        text: "sign up for a new account",
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
}
