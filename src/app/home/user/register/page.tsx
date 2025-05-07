'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"


export default function UserRegister() {
    const { user } = useContext(UserContext)

    const profiles = [
        {
            label: 'Administrador',
            value: 'ADMINISTRATOR'
        },
        {
            label: 'Usuário',
            value: 'USER'
        }
    ]

    return (
        <div className="w-full flex-1 flex flex-col gap-6">
            <div className="w-full flex justify-between">
                <div className="h-full flex flex-col">
                    <span className="text-3xl text-zinc-100">
                        Usuários
                    </span>
                    <span className="text-xl text-zinc-400">
                        Cadastro de usuários
                    </span>
                </div>
            </div>

            <form className="w-full flex-1 flex flex-col gap-4">

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Dados pessoais
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Input variant="zinc900"
                            className="w-full"
                            placeholder="Nome do usuário"
                            icon="User" />
                        <Input variant="zinc900"
                            className="w-full"
                            placeholder="Email do usuários"
                            icon="AtSign" />
                        <Input variant="zinc900"
                            className="w-full max-w-3xs"
                            placeholder="CPF do usuário"
                            icon="User" />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Endereço do usuário
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Input variant="zinc900"
                            className="w-full"
                            placeholder="Endereço"
                            icon="MapPinHouse" />
                        <Input variant="zinc900"
                            className="w-80"
                            placeholder="Número"
                            icon="MapPinHouse" />
                        <Input variant="zinc900"
                            className="w-96"
                            placeholder="Bairro"
                            icon="MapPinHouse" />
                    </div>
                    <div className="flex w-full gap-2">
                        <Input variant="zinc900"
                            className="w-full"
                            placeholder="Complemento"
                            icon="MapPinHouse" />
                        <Input variant="zinc900"
                            className="w-80"
                            placeholder="CEP"
                            icon="MapPinHouse" />
                        <Input variant="zinc900"
                            className="w-md"
                            placeholder="Cidade"
                            icon="MapPinHouse" />
                        <Input variant="zinc900"
                            className="w-md"
                            placeholder="Estado"
                            icon="MapPinHouse" />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Segurança e privacidade
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Input variant="zinc900"
                            className="w-full"
                            placeholder="Escolha uma senha"
                            type="password"
                            icon="KeyRound" />
                        <Input variant="zinc900"
                            className="w-full"
                            placeholder="Confirme a senha"
                            type="password"
                            icon="KeyRound" />
                        <Combobox placeholder="Perfil" data={profiles} />

                        <div className="items-top flex h-full items-center space-x-2">
                            <Checkbox id="terms1" defaultChecked/>
                            <div className="grid gap-1.5 leading-none w-max">
                                <label
                                    htmlFor="terms1"
                                    className="text-sm text-zinc-100 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Usuário ativo?
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="w-full flex gap-2 justify-end">
                    <Button variant='destructive' size="lg">
                        Cancelar
                    </Button>
                    <Button size="lg">
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    )
}
