import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-green-500 text-zinc-100 text-sm font-medium shadow-shape hover:bg-green-500/90 [&_.isloadingspin]:text-zinc-950",
        secondary:
          "bg-secondary text-secondary-foreground text-sm font-medium shadow-xs hover:bg-secondary/80",
        destructive:
          "bg-red-500 text-zinc-100 text-sm font-medium shadow-shape hover:bg-red-500/90 [&_.isloadingspin]:text-zinc-950",
        outline:
          "border bg-background shadow-xs hover:bg-accent text-sm font-medium hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline text-sm font-medium",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        clean: "p-0 hover:bg-transparent hover:cursor-pointer hover:text-accent w-max h-max m-0"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      >
      {isLoading ?
        <LoaderCircle strokeWidth={2} className="size-6 animate-spin isloadingspin" />
        : children}
    </Comp>
  )
}

export { Button, buttonVariants }
