"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Lock, EyeClosed, Eye, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Reset() {
  const router = useRouter();
  const [resetForm, setResetForm] = React.useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
    validation: {
      email: new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
      password: new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"),
    },
  });
  const [toggle, setToggle] = React.useState({
    passwordVisible: false,
  });
  const [sendCode, setSendCode] = React.useState({
    code: ["", "", "", ""],
    seconds: 59,
    isCodeComplete: false,
  });
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    if (step === 2 && sendCode.seconds > 0) {
      const timer = setInterval(() => {
        setSendCode((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, sendCode.seconds]);

  const iconToggle = (type) => {
    setToggle((prev) => ({ ...prev, [type]: !prev[type] }));
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
        : name === "email" && !resetForm.validation.email.test(value)
        ? "invalid_email"
        : name === "password" && !resetForm.validation.password.test(value)
        ? "invalid_password"
        : null;
    setResetForm((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: errorMessages[error] },
    }));

    return error === null;
  };

  const user = JSON.parse(localStorage.getItem("userDetails")).find(
    (user) => user.email === resetForm.email
  );
  const username = user ? user.name : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
    if (name === "password") {
      updateLocalStorage(resetForm.email, value);
    }
  };

  const updateLocalStorage = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
    const existingUser = existingUsers.find((user) => user.email === email);
    if (existingUser) {
      existingUser.password = password;
      localStorage.setItem("userDetails", JSON.stringify(existingUsers));
    }
  };

  const handleChange = (e, index) => {
    const newCode = [...sendCode.code];
    newCode[index] = e.target.value;

    if (e.target.value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
    setSendCode((prev) => ({ ...prev, code: newCode }));

    const isCodeComplete = newCode.every((digit) => digit !== "");
    setSendCode((prev) => ({ ...prev, isCodeComplete }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    let iSValid = true;
    const formFields = step === 3 ? ["password"] : ["email"];
    formFields.forEach((field) => {
      if (!handleValidation(field, resetForm[field])) {
        iSValid = false;
      } else {
        iSValid = true;
      }
    });
    if (iSValid) {
      if (step === 1) {
        setStep(2);
      }
    }
    if (step === 2) {
      setStep(3);
    }
    if (step == 3) {
      if (iSValid) {
        // navigate("/dashboard", { state: { username } });
        router.push("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/login/signin");
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const pageNumber = (step) => {
    const totalPages = 3;
    return {
      step: `${step}`,
      totalPages: `${totalPages}`,
    };
  };
  return (
    <div className="w-[300px]">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <ChevronLeft className="h-5 w-5" onClick={handleBack} />
          <div className="flex">
            <p className="text-muted-foreground">
              <span className="text-primary ">{pageNumber(step).step}</span> /
              {pageNumber(step).totalPages}
            </p>
          </div>
        </div>

        {step === 1 ? (
          <>
            <div className="text-[20px] font-semibold">
              <p>Reset password</p>
            </div>
            <div className="instructions">
              <p>Enter your email to receive the verification code.</p>
            </div>

            <div>
              <div className="relative flex items-center">
                <Mail className="h-4 w-4 absolute left-3" />
                <Input
                  placeholder="Pietro@gmail.com"
                  className="px-10"
                  name="email"
                  value={resetForm.email}
                  onChange={handleInputChange}
                />
              </div>
              {resetForm.errors.email && (
                <p className="text-red-400 text-sm pt-2 text-right">
                  {resetForm.errors.email}
                </p>
              )}
            </div>

            <Button className="w-full" onClick={handleContinue}>
              Send Code
            </Button>
          </>
        ) : step === 2 ? (
          <>
            <div className="text-[20px] font-semibold">
              <p>Reset password</p>
            </div>

            <p>Enter the code we sent to your email to verify your account.</p>

            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                {sendCode.code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="*"
                    className="h-[48px] text-center text-lg text-muted-foreground"
                  />
                ))}
              </div>
              <p className="text-end text-sm">
                Resend in {sendCode.seconds} sec
              </p>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!sendCode.isCodeComplete}
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            <div className="text-[20px] font-semibold">
              <p>Reset password</p>
            </div>
            <div>
              <div className="relative flex items-center">
                <Lock className="h-4 w-4 absolute left-3" />
                <Input
                  type={toggle.passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={resetForm.password}
                  onChange={handleInputChange}
                  className="px-10"
                />
                <div
                  className="absolute right-3"
                  onClick={() => iconToggle("passwordVisible")}
                >
                  {toggle.passwordVisible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeClosed className="h-4 w-4" />
                  )}
                </div>
              </div>

              {resetForm.errors.password && (
                <p className="text-red-400 text-sm pt-2 text-right">
                  {resetForm.errors.password}
                </p>
              )}
            </div>

            <Button
              onClick={handleContinue}
              disabled={!sendCode.isCodeComplete}
            >
              Updated password
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Reset;
