'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@bprogress/next/app";
import { DataTable } from "@/components/custom/data-table";
import { UserDataTable, columns } from "./columns";
import { useAction } from "next-safe-action/hooks";
import { usersList } from "@/actions/user/users-list";
import { toast } from "sonner";
import { useEffect, useState } from "react";


export default function SchoolPage() {
    const router = useRouter()
    const usersListAction = useAction(usersList)
    const [tableData, setTableData] = useState<UserDataTable[]>([])

    useEffect(() => {
        async function getUsers() {
            const usersListResponse = await usersListAction.executeAsync()

            if (!usersListResponse?.data) {
                toast('Ocorreu um erro ao consultar os usuários.')
                return
            }

            // Convertendo os dados
            const data: UserDataTable[] = usersListResponse.data.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    CPF: user.cpf,
                    profile: user.type
                }
            })

            // Adicionando os dados no estádo da tabela
            setTableData(data)
        }
        getUsers()
    }, [])

    return (
        <div className="w-full flex-1 flex flex-col gap-6">
            <div className="w-full flex justify-between">
                <div className="h-full flex flex-col">
                    <span className="text-3xl text-zinc-100">
                        Escolas
                    </span>
                    <span className="text-xl text-zinc-400">
                        Visualização de escolas
                    </span>
                </div>

                <Button onClick={() => router.push('/home/school/register')}>
                    Cadastrar nova escola
                </Button>
            </div>

            <div className="w-full flex-1 flex flex-col gap-2">
                <div className="w-full">
                    <Input variant="zinc900"
                        sizes="md"
                        placeholder="Buscar usuário..."
                        icon="Search"
                        className="w-52"
                    />
                </div>

                <DataTable columns={columns} data={tableData} isLoading={usersListAction.isPending}/>
            </div>
        </div>
    )
}
