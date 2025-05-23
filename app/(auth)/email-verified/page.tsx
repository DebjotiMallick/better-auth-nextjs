import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function EmailVerifiedPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 text-center p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Email Verified!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your email has been successfully verified. You can now enjoy all the
          features of our platform.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className={`${buttonVariants({
              variant: "default",
              className: "w-full sm:w-auto px-6 py-3 text-base",
            })}`}
          >
            Go to Home Page
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Having trouble?{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline font-medium dark:text-primary-400"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
