'use client'

import * as React from "react"

import { icons } from "lucide-react";
import { DynamicIcon } from 'lucide-react/dynamic';

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "./button";
import { Separator } from "@radix-ui/react-separator";

const inputVariants = cva(
  "flex rounded-lg justify-center items-center gap-3 flex-col",
  {
    variants: {
      variant: {
        default:
          "bg-transparent border text-primary-foreground shadow-xs",
        zinc900:
          "bg-zinc-900 [&_.separator-errorsmessages]:bg-zinc-800/90 shadow-shape text-zinc-100 placeholder:text-zinc-500 hover:bg-zinc-900/80"
      },
      sizes: {
        default: "py-3 px-5 text-base md:text-sm lg:text-base",
        md: "py-2 px-3 text-sm placeholder:text-sm [&_.icon]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
    },
  }
)

function Input({ 
  className, 
  variant, 
  sizes, 
  type, 
  icon,
  errorsMessages, 
  ...props 
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    icon?: keyof typeof icons,
    errorsMessages?: string[]
  }) {

  // State controller input type
  const [inputType, setInputType] = React.useState(type)

  // Icon component
  const Icon = icon && icons[icon]

  // Função que controla o clique no botão de espiar senha
  function HandleSpy() {
    if (inputType === "password") {
      setInputType("text")
    } else {
      setInputType("password")
    }
  }

  // Componente botão que espia senha quando o input é do tipo password
  const ButtonSpy = (
    <Button variant="ghost" size="clean" onClick={HandleSpy} type="button">
      <DynamicIcon
        name={inputType === "password" ? "eye" : "eye-off"}
        strokeWidth={2}
        className="text-zinc-400 size-5.5"
      />
    </Button>
  )

  return (
    <div className={cn(inputVariants({ variant, sizes, className }))}>

      <div className="w-full flex justify-center items-center gap-3">
        {Icon && <Icon name={icon} strokeWidth={2} className="text-zinc-400 size-5.5 icon" />}

        <input
          type={inputType}
          className="w-full h-full placeholder:text-muted-foreground transition-[color,box-shadow] outline-none file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />

        {type === "password" && ButtonSpy}
      </div>

      {errorsMessages && (
        <div className="w-full h-max flex flex-col gap-2">
          <Separator className="h-[1px] w-full separator-errorsmessages" />
          
          <span className="text-xs text-red-400">
            {errorsMessages[0]}
          </span>

        </div>
      )}

    </div>
  )
}

export { Input, inputVariants }
