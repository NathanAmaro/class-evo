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
import { useAction } from "next-safe-action/hooks";
import { userRemove } from "@/actions/user/user-remove";
import { toast } from "sonner";


export type UserDataTable = {
    id: string
    name: string
    CPF: string
    profile: "ADMINISTRATOR" | "USER"
}

function ActionsButtonTable({ id }: { id: string }) {
    const router = useRouter()
    const userRemoveAction = useAction(userRemove)

    async function handleRemoveRegisterAction() {
        const responseUserRemoveAction = await userRemoveAction.executeAsync({id: id})


        // Verificando se retornou algum erro de validação dos campos na server action
        if (responseUserRemoveAction?.validationErrors) {
            return
        }

        // Verificando se retornou algum erro interno na server action
        if (responseUserRemoveAction?.serverError) {
            toast(responseUserRemoveAction.serverError)
            return
        }

        // Verificando se o resultado retornou como sucesso
        if (responseUserRemoveAction?.data?.success) {
            // Enviando mensagem para o usuário
            toast.success(responseUserRemoveAction.data.success)
            // Redirecionando o usuário para a tela de visualização de usuários
            router.refresh()
        }
    }

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
                    onClick: () => handleRemoveRegisterAction()
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