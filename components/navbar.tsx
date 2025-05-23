"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  console.log(session);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Session loading is complete when status changes from 'loading' to either 'authenticated' or 'unauthenticated'
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    toast.success("Successfully logged out!");
  };

  // Show a loading skeleton while checking auth state
  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-[100vw] px-3 md:px-5 mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{
                  animation: "shimmer 2s infinite linear",
                  transform: "translateX(-100%)",
                }}
              />
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-[100vw] px-3 md:px-5 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            {/* <span className="text-xl font-bold">YourLogo</span> */}
          </Link>
          <nav className="hidden md:flex items-center ml-10 space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <ThemeToggle />
              {session?.user?.role === "admin" ||
                (session?.user?.email ===
                  process.env.NEXT_PUBLIC_ADMIN_EMAILS && (
                  <Link
                    href="/admin"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    Admin
                  </Link>
                ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || "User"}
                      />
                      <AvatarFallback>
                        <UserIcon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link
                href="/signup"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 py-4">
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {session ? (
                    <>
                      <Link
                        href="/profile"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-destructive"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
