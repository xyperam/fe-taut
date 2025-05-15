import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata : Metadata={
    title: 'Login',
    description: 'Login to your account',
}
export default function Layout ({children}: {children: ReactNode}) {
        return (
            <>
            {children}
            </>
        );
    }
    