import { SignupForm } from "./SignupForm";
import { AuthLayout } from "@/components/auth";

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
