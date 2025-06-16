"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slice/auth.slice";
import type { AppDispatch } from "@/redux/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .required("Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2ECFF] to-[#E8F0FF] px-4">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-1">
          🔐 Welcome back, wizard!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to manage your enchanted links ✨
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await dispatch(loginUser(values)).unwrap();
              localStorage.setItem("token", result.token);
              router.push("/dashboard");
            } catch (error) {
              alert("Login failed. Please check your email or password.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <Field
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="Password"
                  className="w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold p-2 rounded-md transition duration-300"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-purple-500 font-medium hover:underline"
          >
            Sign up!
          </a>
        </div>

        <div className="mt-2 text-center text-sm">
          <a
            href="/"
            className="text-gray-400 hover:text-purple-400 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}
