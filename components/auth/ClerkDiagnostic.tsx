"use client";

import { useClerk, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function ClerkDiagnostic() {
  const clerk = useClerk();
  const auth = useAuth();

  useEffect(() => {
    console.log("=== CLERK DIAGNOSTIC REPORT ===");
    console.log("useClerk output:", clerk);
    console.log("useAuth output:", auth);
    console.log("isLoaded status:", auth.isLoaded);
    console.log("===============================");
  }, [clerk, auth]);

  return null;
}
