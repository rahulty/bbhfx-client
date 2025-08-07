"use client";

import Link from "next/link";
import { StrapiErrors } from "./strapi-errors";
import { SubmitButton } from "./SubmitButton";
import { ZodErrors } from "./ZodErrors";
import { authStore } from "@/store/auth-store";
import { useSelector } from "@xstate/store/react";

// import {
//   CardTitle,
//   CardDescription,
//   CardHeader,
//   CardContent,
//   CardFooter,
//   Card,
// } from "@/components/ui/card";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

const Card = ({
  children,
  ...restProps
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div {...restProps}>{children}</div>
);
import {
  ReactNode,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { useRouter } from "next/navigation";

const CardHeader = ({
  children,
  ...restProps
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div {...restProps}>{children}</div>
);
const CardContent = ({
  children,
  ...restProps
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div {...restProps}>{children}</div>
);
const CardFooter = ({
  children,
  ...restProps
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div {...restProps}>{children}</div>
);
const CardDescription = ({
  children,
  ...restProps
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div {...restProps}>{children}</div>
);
const Label = ({
  children,
  ...restProps
}: { children: ReactNode } & LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...restProps}>{children}</label>
);
const Input = ({ ...restProps }: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...restProps} />
);
const CardTitle = ({
  children,
  ...restProps
}: { children: ReactNode } & HTMLAttributes<HTMLHeadingElement>) => (
  <h1 {...restProps}>{children}</h1>
);

export function SigninForm() {
  const router = useRouter();
  const zodErrors = useSelector(authStore, (s) => s.context.zodErrors);
  const strapiErrors = useSelector(authStore, (s) => s.context.strapiErrors);

  const handleFormAction = (formData: FormData) => {
    authStore.trigger.login({ formData });
  };

  authStore.on("loggedIn", () => {
    router.replace("/dashboard");
  });

  return (
    <div className="w-full max-w-md">
      <form action={handleFormAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>

            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />

              <ZodErrors error={zodErrors?.identifier} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />

              <ZodErrors error={zodErrors?.password} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <SubmitButton className="w-full" text="Sign In" />

            <StrapiErrors error={strapiErrors} />
          </CardFooter>
        </Card>

        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
