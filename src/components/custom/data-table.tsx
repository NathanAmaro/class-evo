'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    isLoading?: boolean
}

export function DataTable<TData, TValue>({ columns, data, isLoading }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div className="flex-1 flex flex-col justify-between border-[1px] border-zinc-900 rounded-md">
            <Table>
                <TableHeader className="bg-zinc-900">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="text-zinc-100 first:rounded-tl-md last:rounded-tr-md">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow className="row-loading">
                            <TableCell colSpan={columns.length} className="justify-center">
                                <div className="w-full h-36 flex justify-center items-center">
                                    <LoaderCircle strokeWidth={1.5} className="size-14 animate-spin text-zinc-300" />
                                </div>

                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="border-none hover:bg-zinc-800"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-zinc-100 font-extralight">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <div className="w-full flex bg-zinc-900 py-2 px-2 rounded-bl-md rounded-br-md">
                <div className="flex w-max">
                    <span className="text-zinc-300 font-extralight text-xs">
                        {`Mostrando ${table.getFilteredRowModel().rows.length} registros`}
                    </span>
                </div>
            </div>
        </div>
    )
}