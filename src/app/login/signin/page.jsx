"use client";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signin() {
  const router = useRouter();
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
      invalid_user: "",
    },
    validation: {
      email: new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
      password: new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"),
    },
  });

  const signinField = [
    { icon: Mail, value: "email", placeholder: "Pietro@gmail.com" },
    { icon: Lock, value: "password", placeholder: "Password" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const handleValidation = (name, value) => {
    const errorMessages = {
      required: `${name} is required.`,
      invalid_email: "Your email is invalid.",
      invalid_password:
        "Password must be at least 6 characters long and contain at least one letter and one number.",
    };
    const error =
      value === ""
        ? "required"
        : name === "email" && !signInForm.validation.email.test(value)
        ? "invalid_email"
        : name === "password" && !signInForm.validation.password.test(value)
        ? "invalid_password"
        : null;

    setSignInForm((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: errorMessages[error] },
    }));

    return error === null;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const formFields = ["email", "password"];
    const isValid = formFields.every((field) =>
      handleValidation(field, signInForm[field])
    );

    if (isValid) {
      const existingUsers =
        JSON.parse(localStorage.getItem("userDetails")) || [];
      const existingUser = existingUsers.find(
        (user) =>
          user.email === signInForm.email &&
          user.password === signInForm.password
      );

      if (existingUser) {
        router.push("/dashboard");
      } else {
        setSignInForm((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            invalid_user: "Invalid email or password",
          },
        }));
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[300px]">
      <p className="text-[20px] font-semibold text-center">
        Enter your password
      </p>
      <div className="flex flex-col">
        {signinField.map((field, i) => {
          const Icon = field.icon;
          return (
            <div key={i} className="pt-3">
              <div className="relative flex items-center">
                <Icon className="h-4 w-4 absolute left-3" />
                <Input
                  placeholder={field.placeholder}
                  className="px-10"
                  name={field.value}
                  value={signInForm[field.value]}
                  onChange={handleInputChange}
                />
              </div>
              {signInForm.errors[field.value] && (
                <p className="text-red-500 text-sm text-right">
                  {signInForm.errors[field.value]}
                </p>
              )}
            </div>
          );
        })}
        <Link
          href="/login/reset"
          className="text-end text-sm pt-2 text-muted-foreground"
        >
          Forgot password
        </Link>
      </div>
      <div>
        <Button onClick={handleSignIn} className="w-[100%]">
          Continue
        </Button>
        {signInForm.errors.invalid_user && (
          <p className="text-red-500 text-sm pt-2 text-end">
            {signInForm.errors.invalid_user}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signin;
