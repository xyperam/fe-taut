'use client'

import * as React from "react"
import ReduxProvider from "./reduxProvider";
export default function RootProvider({ children }: { children: React.ReactNode }) {
    return (
       <ReduxProvider>
            {children}
        </ReduxProvider>
    );
}