"use client";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { authClient } from "@repo/ui/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL");

  if (!isPending && session) {
    if (callbackURL) {
      window.location.href = callbackURL;
    } else {
      router.push("/dashboard");
    }
    return null; // Prevent rendering form while redirecting
  }

  return showSignIn ? (
    <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
  ) : (
    <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
  );
}
