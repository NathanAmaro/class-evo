'use client'

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash, ArrowUpDown } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import { useRouter } from "@bprogress/next/app";
import { addMaskCPF, addMaskProfile } from "@/lib/add-masks";
import { Button } from "@/components/ui/button";


export type UserDataTable = {
    id: string
    name: string
    CPF: string
    profile: "ADMINISTRATOR" | "USER"
}

function ActionsButtonTable({ id }: { id: string }) {
    const router = useRouter()

    // Função executada ao clicar no botão editar
    function handleEditRegister() {
        router.push(`/home/user/edit/${id}`)
    }

    // Função executada ao clicar no botão excluir
    function handleRemoveRegister() {
        confirmAlert({
            title: 'Confirmação de exclusão',
            message: 'Tem certeza que deseja excluir o registro selecionado?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => alert(id)
                },
                {
                    label: 'Não'
                }
            ]
        })
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-zinc-900 ring-0 outline-0 rounded-sm px-[1px] shadow-shape hover:cursor-pointer hover:bg-zinc-800">
                <Ellipsis className="w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-shape">
                <DropdownMenuLabel>
                    Opções
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleEditRegister()}
                    className="hover:cursor-pointer hover:bg-zinc-100 text-zinc-900"
                >
                    <Pencil className="text-zinc-900" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleRemoveRegister()}
                    className="hover:cursor-pointer hover:bg-zinc-100 text-zinc-900"
                >
                    <Trash className="text-red-500" />
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<UserDataTable>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="clean"
                    className="hover:bg-transparent hover:text-zinc-100"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "CPF",
        header: "CPF",
        cell: ({ row }) => {
            const user = row.original
            return addMaskCPF(user.CPF)
        }
    },
    {
        accessorKey: "profile",
        header: "Perfil",
        cell: ({ row }) => {
            const user = row.original
            return addMaskProfile(user.profile)
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            return (
                <ActionsButtonTable id={user.id} />
            )
        }
    }
]