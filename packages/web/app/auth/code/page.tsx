"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useSearchParams } from "next/navigation";

export default function ConfirmCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if (!email) return null;
  return (
    <div className="flex h-screen">
      <div className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-b from-peppyhop-900 to-peppyhop-500" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            App
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Confirm OTP code
              </h1>
            </div>
            <div className="grid gap-6">
              <form
                action={`${process.env.NEXT_PUBLIC_AUTH_URL!}/code/authorize`}
                method="POST"
              >
                <div className="flex flex-col gap-2 items-center">
                  <Label className="sr-only" htmlFor="code">
                    Confirm OTP code:
                  </Label>
                  <small className="text-sm text-gray-500 text-center">
                    Check your email: <b>{email}</b> for login code
                  </small>
                  <InputOTP
                    className="w-full"
                    name="code"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <input type="hidden" name="email" value={email} />
                  <input type="hidden" name="action" value="verify" />
                  <input
                    type="hidden"
                    name="redirect_uri"
                    value="https://localhost:3000/auth/callback"
                  />
                  <Button type="submit">Confirm</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
