"use client";
import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    name: "",
    password: "",
    errors: {
      email: "",
      password: "",
      name: "",
      user: "",
    },
    validation: {
      email: new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
      password: new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"),
    },
  });

  const signupField = [
    { icon: Mail, value: "email", placeholder: "Pietro@gmail.com" },
    { icon: User, value: "name", placeholder: "Username" },
    { icon: Lock, value: "password", placeholder: "Password" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({
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
        : name === "email" && !signUpForm.validation.email.test(value)
        ? "invalid_email"
        : name === "password" && !signUpForm.validation.password.test(value)
        ? "invalid_password"
        : null;

    setSignUpForm((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: errorMessages[error] },
    }));

    return error === null;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const formFields = ["email", "name", "password"];
    const isValid = formFields.every((field) =>
      handleValidation(field, signUpForm[field])
    );
    if (isValid) {
      const existingUsers =
        JSON.parse(localStorage.getItem("userDetails")) || [];
      const existingUser = existingUsers.find(
        (user) =>
          user.email === signUpForm.email || user.name === signUpForm.name
      );
      if (existingUser) {
        setSignUpForm((prev) => ({
          ...prev,
          errors: { ...prev.errors, user: "User already exists" },
        }));
        return;
      }
      const newUser = { ...signUpForm };
      existingUsers.push(newUser);
      localStorage.setItem("userDetails", JSON.stringify(existingUsers));
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[300px]">
      <p className="text-[20px] font-semibold text-center pb-2">
        Create Your Account
      </p>
      <div className="flex flex-col gap-5">
        {signupField.map((field, i) => {
          const Icon = field.icon;
          return (
            <div key={i}>
              <div className="relative flex items-center">
                <Icon className="h-4 w-4 absolute left-3" />
                <Input
                  placeholder={field.placeholder}
                  className="px-10"
                  name={field.value}
                  value={signUpForm[field.value]}
                  onChange={handleInputChange}
                />
              </div>
              {signUpForm.errors[field.value] && (
                <p className="text-red-500 text-sm text-right">
                  {signUpForm.errors[field.value]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          By agreeing this you are accepting the
          <span className="text-primary"> T&C</span>
        </label>
      </div>
      <Button onClick={handleSignUp}>Sign Up</Button>
      {signUpForm.errors.user && (
        <p className="text-red-500 text-sm text-right">
          {signUpForm.errors.user}
        </p>
      )}
    </div>
  );
}

export default Signup;
