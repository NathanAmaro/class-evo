'use client'

import { ColumnDef } from "@tanstack/react-table";


export type UserDataTable = {
    id: string
    name: string
    CPF: string
    profile: "ADMINISTRATOR" | "USER"
}

export const columns: ColumnDef<UserDataTable>[] = [
    {
        accessorKey: "name",
        header: "Nome"
    },
    {
        accessorKey: "CPF",
        header: "CPF"
    },
    {
        accessorKey: "profile",
        header: "Perfil"
    }
]