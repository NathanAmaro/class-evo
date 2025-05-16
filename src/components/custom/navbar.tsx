'use client'

import { ArrowDown, icons } from "lucide-react"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { useState } from "react"
import { useContext } from "react"
import { useRouter } from "@bprogress/next/app"
import { UserContext } from "@/context/UserContext"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


type UniqueOpt = {
  title: string,
  link: string,
  icon: keyof typeof icons
}

function UniqueOption({ link, title, icon }: UniqueOpt) {
  const router = useRouter()

  // Icon component
  const Icon = icon && icons[icon]

  return (
    <div onClick={() => router.push(link)}
      className="flex w-full h-10 justify-start items-end gap-2 text-zinc-100 py-2 pl-3 text-sm rounded-sm shadow-shape bg-zinc-800 hover:cursor-pointer hover:bg-zinc-800/60">
      <Icon className="text-zinc-100" strokeWidth={1.5}/>
      <span className="text-zinc-100">
        {title}
      </span>
    </div>
  )
}

type CollapsibleOpt = {
  title: string,
  icon: keyof typeof icons,
  options: {
    title: string,
    link: string,
    administrator: boolean
  }[]
}

function CollapsibleOption({ title, icon, options }: React.ComponentProps<"div"> & CollapsibleOpt) {
  const [isOpen, setOpen] = useState(false)
  const { user } = useContext(UserContext)

  // Icon component
  const Icon = icon && icons[icon]

  return (
    <Collapsible onOpenChange={setOpen} className="bg-zinc-800 w-full space-y-2 px-3 py-2 rounded-sm shadow-shape data-[state=closed]:hover:bg-zinc-800/60">

      <CollapsibleTrigger className="text-zinc-100 w-full flex m-0 data-[state=open]:[&_.arrow]:rotate-180 hover:cursor-pointer ">
        <div className="flex w-full items-end gap-2">
          <Icon className="text-zinc-100 w-6" strokeWidth={1.5}/>
          <span className="text-sm mb-[1px]">
            {title}
          </span>

        </div>

        <ArrowDown className="w-6 arrow" strokeWidth={1.5} />
      </CollapsibleTrigger>

      {isOpen && <Separator className="bg-zinc-700 data-[state=open]:bg-red-400 mt-2" />}

      <CollapsibleContent className="text-zinc-100 flex flex-col">
        {options.map((option, index) => (
          <Button key={index} 
            disabled={option.administrator ? user.type == 'ADMINISTRATOR' ? false : true : false} 
            variant="ghost" 
            size='clean' 
            className="w-full justify-start text-zinc-100 py-2 pl-3 text-sm hover:bg-zinc-700"
          >
            {option.title}
          </Button>
        ))}
      </CollapsibleContent>

    </Collapsible>
  )
}

const avaliacaoEDIOptions: {
  title: string,
  link: string,
  administrator: boolean
}[] = [
    {
      title: 'Avaliação EDI',
      link: '/home/reviews',
      administrator: true
    },
    {
      title: 'Tópicos',
      link: '/home/topics',
      administrator: false
    }
  ]

export function Navbar() {
  const { user } = useContext(UserContext)

  return (
    <div className="flex w-full h-full flex-col gap-3">
      <div className="w-full h-max">
        <h1 className="text-3xl text-zinc-100">
          Menu
        </h1>
      </div>

      <div className="h-full w-full flex flex-col gap-3">

        {user.type === 'ADMINISTRATOR' && <UniqueOption title="Usuários" link="/home/user" icon="User" />}

        <UniqueOption title="Escolas" link="/home/school" icon="School" />

        <CollapsibleOption title="Avaliações EDI" icon="User" options={avaliacaoEDIOptions} />
      </div>

    </div>
  )
}