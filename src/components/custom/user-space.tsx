'use client'

import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LoaderCircle } from "lucide-react"

function UserSpace() {
    const { user } = useContext(UserContext)

    return (
        <div className="flex justify-center h-full px-2 rounded-md items-center gap-2 hover:cursor-pointer select-none">
            <span className="text-zinc-100 font-light w-max">
                {user.name ? user.name : (
                    <LoaderCircle strokeWidth={2} className="size-6 text-zinc-100 animate-spin isloadingspin" />
                )}
            </span>
            <Avatar>
                <AvatarImage src="/circle-user-round-zinc100.svg" className="text-zinc-100"/>
            </Avatar>
        </div>
    )
}

export { UserSpace }