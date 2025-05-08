"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
  placeholder?: string,
  width?: string,
  height?: string,
  data: {
    value: string,
    label: string
  }[]
}

export function Combobox({ placeholder, width = 'w-[200px]', height = 'h-[54px]', data }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={`justify-between px-5 text-base md:text-sm lg:text-base rounded-lg bg-zinc-900 hover:bg-zinc-900/90 ${width} ${height}`}
        >
          
          {value
            ?
            <>
              <span className="text-zinc-100 w-full text-left">
                {data.find((data) => data.value === value)?.label}
              </span>
              <div onClick={() => setValue("")}>
                <X className="w-6 text-zinc-300" />
              </div>
            </>
            : (
              <span className="text-zinc-400 w-full text-left">
                {placeholder}
              </span>
            )}
          <ChevronsUpDown className="opacity-50 w-5.5 text-zinc-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${width}`}>
        <Command>
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
            
            <CommandGroup>
              {data.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {data.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}