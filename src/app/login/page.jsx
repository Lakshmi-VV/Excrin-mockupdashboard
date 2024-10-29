"use client";
import { Lock, Mail } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import LOGIN_ADMIN from "../../graphql/loginadmin";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signin() {
  const router = useRouter();

  const [loginAdmin, { error }] = useLazyQuery(LOGIN_ADMIN);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await loginAdmin({
          variables: { email: values.email, password: values.password },
        });
        if (data && data.adminLogin) {
          console.log("Token:", data.adminLogin.token);
          console.log("Name:", data.adminLogin.admin.name);
          localStorage.setItem("token", data.adminLogin.token);
          router.push("/dashboard");
        } else {
          console.error("Invalid credentials");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className=" flex flex-col gap-5 w-[300px]">
      <p className="text-[20px] font-semibold text-center">Admin Login</p>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <div className="relative flex items-center">
            <Mail className="h-4 w-4 absolute left-3" />{" "}
            <Input
              placeholder="Pietro@gmail.com"
              className="px-10"
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-xs text-right">
              {formik.errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <div className="relative flex items-center">
            <Lock className="h-4 w-4 absolute left-3" />
            <Input
              placeholder="Password"
              className="px-10"
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-xs text-right">
              {formik.errors.password}
            </p>
          ) : null}
        </div>

        <Button type="submit" className="w-[100%] ">
          Continue
        </Button>
        {error && (
          <p className="text-red-500 text-sm text-center pt-2  ">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Signin;
