// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import NextNProgress from "nextjs-progressbar";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <>
            <NextNProgress/>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </>
    )
}
