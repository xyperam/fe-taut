"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slice/auth.slice";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AppDispatch } from "@/redux/store";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password can only contain letters")
    .required("Password is required"),
});

export default function Registerpage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.global
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">Tautin</h1>
      <h1 className="text-2xl font-bold">Let's create an account! </h1>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const result = await dispatch(registerUser(values)).unwrap();
            console.log(result);
            resetForm();
            alert("Account created successfully");
            router.push("/login");
          } catch (error) {
            console.error("Failed to create account:", error);
            alert("Failed to create account");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 mt-4 w-80">
            {error && (
              <div className="text-red-500 bg-red-100 p-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <Field
                name="username"
                as={Input}
                placeholder="Username"
                type="text"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field name="email" as={Input} placeholder="Email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="password"
                as={Input}
                placeholder="Password"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <Button
              type="submit"
              className="bg-blue-500 text-white p-2"
              disabled={isSubmitting || loading}
            >
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
