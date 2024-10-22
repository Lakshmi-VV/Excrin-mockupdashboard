"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

function Login() {
  const emailPattern = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  );
  const [email, setEmail] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("signup");
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setErrorMessage("");
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (emailPattern.test(email)) {
      router.push(`/login/${activeTab}`);
    } else {
      setErrorMessage("Please enter a valid email address.");
    }
  };
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign up</TabsTrigger>
        <TabsTrigger value="signin">Sign in</TabsTrigger>
      </TabsList>

      {["signup", "signin"].map((tab) => (
        <TabsContent key={tab} value={tab} className="w-full">
          <p className="text-[20px] font-semibold text-center p-5">
            Ignite Your Reelxperience
          </p>
          <form className="flex flex-col gap-8" onSubmit={handleContinue}>
            <div className="bg-[#fafafa] border border-[#D4D4D8] rounded-lg flex gap-2 items-center justify-center p-1">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.18 8.18157C16.18 7.61431 16.1291 7.06886 16.0345 6.54523H8.5V9.63974H12.8055C12.62 10.6397 12.0564 11.487 11.2091 12.0543V14.0615H13.7945C15.3073 12.6688 16.18 10.6179 16.18 8.18157Z"
                  fill="#4285F4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.49968 16.0001C10.6597 16.0001 12.4706 15.2838 13.7942 14.062L11.2088 12.0547C10.4924 12.5347 9.57604 12.8183 8.49968 12.8183C6.41604 12.8183 4.6524 11.4111 4.02331 9.5202H1.35059V11.5929C2.66695 14.2074 5.3724 16.0001 8.49968 16.0001Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.02364 9.5199C3.86364 9.0399 3.77273 8.52718 3.77273 7.99991C3.77273 7.47265 3.86364 6.95993 4.02364 6.47993V4.40723H1.35091C0.809091 5.48721 0.5 6.70902 0.5 7.99991C0.5 9.29081 0.809091 10.5126 1.35091 11.5926L4.02364 9.5199Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.49968 3.18178C9.67422 3.18178 10.7288 3.58541 11.5579 4.37813L13.8524 2.08361C12.4669 0.792718 10.656 0 8.49968 0C5.3724 0 2.66695 1.79271 1.35059 4.40722L4.02331 6.47993C4.6524 4.58904 6.41604 3.18178 8.49968 3.18178Z"
                  fill="#EA4335"
                />
              </svg>
              <p>Continue with Google</p>
            </div>
            <hr />
            <div>
              <div className="relative flex items-center">
                <Mail className="h-5 w-5 absolute left-3" />
                <Input
                  placeholder="Pietro@gmail.com"
                  className="px-10"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {errorMessage && (
                <p className="text-red-400 text-sm pt-2 text-right">
                  {errorMessage}
                </p>
              )}
            </div>
            <Button className="w-full" type="submit">
              Continue
            </Button>
          </form>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default Login;
