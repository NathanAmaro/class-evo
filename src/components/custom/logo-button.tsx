'use client'

import { useRouter } from "@bprogress/next/app";
import Image from "next/image";


export function LogoButton() {
    const router = useRouter()

    return (
        <div onClick={() => router.push('/home')} className="flex w-full hover:cursor-pointer">
            <Image src='/logo-240x50.svg' alt="Logo" width={120} height={25} />
        </div>
    )
}