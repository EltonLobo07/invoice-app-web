import { SignupForm } from "./SignupForm";
import { AuthLayout } from "@/components/auth";

export const metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <AuthLayout
      heading="Sign up"
      alternative={{
        href: "/login",
        text: "sign in to your existing account",
      }}
    >
      <SignupForm />
    </AuthLayout>
  );
}
