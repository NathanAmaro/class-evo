"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer py-3 h-7 w-12 data-[state=checked]:bg-zinc-100 data-[state=unchecked]:bg-zinc-900 data-[state=unchecked]:pl-2 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-shape transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "data-[state=unchecked]:bg-zinc-100 data-[state=checked]:bg-zinc-900 pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
