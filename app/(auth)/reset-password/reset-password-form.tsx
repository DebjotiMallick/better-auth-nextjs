"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the token from the URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token) {
      setError(
        "Invalid or missing reset token. Please request a new password reset link."
      );
    }
  }, [token]);

  const handleResetPassword = async () => {
    if (!token || !email) {
      setError("Invalid or missing reset token or email");
      return;
    }

    if (!password) {
      setError("Please enter a new password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call Better Auth's reset password function
      await authClient.resetPassword({
        newPassword: password,
        token,
      });

      setSuccess(true);

      // Redirect to sign-in after a short delay
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (err) {
      setError("Failed to reset password. The link may have expired.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-4">
        <p className="text-green-600 mb-4">
          Password reset successful! You will be redirected to the sign-in page.
        </p>
        <Link href="/signin" className="text-primary underline">
          Go to sign-in
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          value={password}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          value={confirmPassword}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full"
        disabled={loading || !token}
        onClick={handleResetPassword}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <p>Reset Password</p>
        )}
      </Button>

      <div className="text-center mt-4">
        <Link href="/signin" className="text-sm text-primary underline">
          Back to sign-in
        </Link>
      </div>
    </div>
  );
}
