import { AuthLayout } from "@/components/auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Sign in",
};

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
