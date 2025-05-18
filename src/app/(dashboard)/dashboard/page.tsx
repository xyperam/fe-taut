'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter as userRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/slice/auth.slice';


export default function Dashboardpage() {
    const router = userRouter();
    const token = useSelector((state: RootState) => state.global.authLogin.token);

    
    useEffect(()=>{
        if (!token){
            //cek local storage
            const storedToken = localStorage.getItem('token');
            if (!storedToken){
                router.push("/login");
            }
        }
    },[token, router]);

    return (
        <div>
            cuman bisa diakses kalau lo udah login
        </div>
    );
}