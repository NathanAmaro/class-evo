'use client'

import { useEffect } from "react"


export default function UserEditPage({ params }: { params: Promise<{ id: string }> }) {

    useEffect(() => {
        async function fetchUserDetails() {
            const { id } = await params
            console.log(id)
        }
        fetchUserDetails()
    }, [])
    

    return (
        <h1 className="text-zinc-100">
            USER REGISTER
        </h1>
    )
}
