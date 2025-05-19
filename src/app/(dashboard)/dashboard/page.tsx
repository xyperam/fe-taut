'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter as userRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/slice/auth.slice';


export default function Dashboardpage() {
    const router = userRouter();
    const token = useSelector((state: RootState) => state.global.authLogin.token);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        const checkAuth = ()=>{
            const storedToken = localStorage.getItem('token');
            if(!storedToken){
                router.replace('/login');
            }else{
                setLoading(false);
            }
        };
        checkAuth();
    },[token,router]);

    if(loading){
        return <div>Loading...</div>;
    }
    return (
        <div>
            cuman bisa diakses kalau lo udah login
        </div>
    );
}