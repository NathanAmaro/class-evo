"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  description,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { description?: string }) {
  return (
    <div className="flex h-full w-max space-x-2">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer border-input data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-900 data-[state=checked]:border-zinc-700 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {description ? (
        <div className="grid gap-1.5 leading-none w-max">
          <label
            className="text-sm text-zinc-100 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {description}
          </label>
        </div>
      ) : null}
    </div>

  )
}

export { Checkbox }
