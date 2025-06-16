"use client";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slice/auth.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .required("Password is required"),
});

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.global);
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F2ECFF] to-[#E8F0FF] p-6">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-purple-700 text-center mb-1">
          ✨ Let’s get started!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your magical Wizz account
        </p>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await dispatch(registerUser(values)).unwrap();
              resetForm();
              alert("Account created successfully ✨");
              router.push("/login");
            } catch (error) {
              alert("Something went wrong, please try again");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {error && (
                <div className="text-red-600 bg-red-100 p-2 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <Field
                  name="username"
                  as={Input}
                  type="text"
                  placeholder="Username"
                  className="w-full"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

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
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold p-2 rounded-md transition duration-300"
                disabled={isSubmitting || loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <p className="text-sm text-center text-gray-500 mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-purple-600 font-medium hover:underline"
                >
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
