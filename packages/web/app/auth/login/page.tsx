import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login } from "../action";

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-b from-peppyhop-900 to-peppyhop-500" />
          <Link
            href="/"
            className="relative z-20 flex items-center text-lg font-medium"
          >
            App
          </Link>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Hop in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign-up or sign-in
              </p>
            </div>
            <div className="grid gap-6">
              <form
                action={`${process.env.NEXT_PUBLIC_AUTH_URL!}/code/authorize`}
                method="POST"
              >
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      Email:
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <input type="hidden" name="provider" value="code" />
                  <input type="hidden" name="action" value="request" />
                  <Button type="submit">Sign In with Email</Button>
                </div>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <form
                action={async () => {
                  "use server"
                  await login("google")
                }}
              >
                <Button variant="outline" className="w-full" type="submit">
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
