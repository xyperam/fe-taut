'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import {loginUser} from "@/redux/slice/auth.slice";
import {useDispatch,useSelector} from "react-redux";
import type { AppDispatch } from "@/redux/store";
import * as Yup from "yup";
import {Formik,Form,Field,ErrorMessage} from "formik";
import { useRouter } from 'next/navigation';
export default function Loginpage(){
  const router = useRouter();
  const [formData,setFormData]= useState({
    email:"",
    password:"",
  });
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password can only contain letters")
        .required("Password is required"),
  });
    return (
       <main className="flex flex-col items-center justify-between p-24">
        <h1 className="text-2xl font-bold">Tautin</h1>
        <h1 className="text-2xl font-bold">Welcome back! </h1>  
        <Formik
        initialValues = {{email:'',password:''}}
        validationSchema={validationSchema}
        onSubmit={async (values,{setSubmitting,resetForm})=>{
          try{
            const result = await dispatch(loginUser(values)).unwrap();
            console.log(result);
            localStorage.setItem('token', result.token); 
console.log(result.token);
            router.push('/dashboard');
          }catch(error){
            console.log(error);
            alert("Login failed");
          }
          finally{
            setSubmitting(false);
          }
        }}
        >
          {({isSubmitting})=>(
        <Form className="flex flex-col gap-4 mt-4 w-80">
          <div>
            <Field
            name ="email"
            type="email"
            placeholder="Email"
            as ={Input}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <div>
            <Field
            name ="password"
            type="password"
            placeholder="Password"
            as ={Input}
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
          </div>
          <Button type="submit" className="bg-blue-500 text-white p-2">Login</Button>
        </Form>
          )}
        </Formik>
       <p className="mt-4 flex items-center gap-x-1 text-sm">
            Don't have an account?
            <a href="/register" className="text-blue-500 hover:underline">Sign up!</a>
        </p>
                <a href="/" className="text-gray-700 text-sm hover:underline">Forgot password?</a>
         </main>
    );
}