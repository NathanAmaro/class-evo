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
import { Separator } from "./separator"

type ComboboxProps = {
  placeholder?: string,
  width?: string,
  height?: string,
  data: {
    value: string,
    label: string
  }[]
  value: string
  onSelect: (value: string) => void,
  errorsMessages?: string[],
}

export function Combobox({ placeholder, width = 'w-[220px]', height = 'h-max', data, value, onSelect, errorsMessages }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [valueState, setValueState] = React.useState(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={`justify-between py-2.5 px-5 flex flex-col text-base md:text-sm lg:text-base rounded-lg bg-zinc-900 hover:bg-zinc-900/90 ${width} ${height}`}
        >
          <div className="w-full h-full py-[1px] flex items-center justify-between gap-2">
            {valueState
              ?
              <>
                <span className="text-zinc-100 w-full text-left">
                  {data.find((data) => data.value === valueState)?.label}
                </span>
                <div onClick={() => { setValueState(""); onSelect("") }}>
                  <X className="w-6 text-zinc-300" />
                </div>
              </>
              : (
                <span className="text-zinc-400 w-full text-left">
                  {placeholder}
                </span>
              )}
            <ChevronsUpDown className="opacity-50 w-5.5 text-zinc-400" />
          </div>

          {errorsMessages && (
            <div className="w-full h-max py-0.5 flex text-wrap flex-col gap-2">
              <Separator className="h-[1px] w-full bg-zinc-800/90" />

              <span className="text-xs text-left text-red-400">
                {errorsMessages[0]}
              </span>

            </div>
          )}

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
                  className="hover:cursor-pointer"
                  onSelect={(currentValue) => {
                    onSelect(currentValue === valueState ? "" : currentValue)
                    setValueState(currentValue === valueState ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {data.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      valueState === data.value ? "opacity-100" : "opacity-0"
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