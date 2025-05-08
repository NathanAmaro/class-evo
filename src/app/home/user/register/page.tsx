'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FormEvent } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { userCreate } from "@/actions/user/user-create"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "@bprogress/next/app"
import { confirmAlert } from 'react-confirm-alert'

type FormInputs = {
    name: string,
    email: string,
    cellphone?: string,
    cpf: string,
    address?: string,
    address_number?: string,
    address_district?: string,
    address_complement?: string,
    address_cep?: string,
    address_city?: string,
    address_uf?: string,
    password: string,
    confirm_password: string
}

export default function UserRegister() {
    const userCreateAction = useAction(userCreate);
    const { register, getValues } = useForm<FormInputs>();
    const router = useRouter()

    // Lista de opções para o combobox Perfil
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

    // Função executada ao clicar no botão salvar
    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = getValues()

        const responseUserCreateAction = await userCreateAction.executeAsync({
            name: formData.name,
            email: formData.email,
            cellphone: formData.cellphone,
            cpf: formData.cpf,
            address: formData.address,
            address_number: formData.address_number,
            address_district: formData.address_district,
            address_complement: formData.address_complement,
            address_cep: formData.address_cep,
            address_city: formData.address_city,
            address_uf: formData.address_uf,
            password: formData.password,
            confirm_password: formData.confirm_password
        })

        // Verificando se retornou algum erro de validação na server action
        if (responseUserCreateAction?.validationErrors) {
            return
        }

        // Verificando se retornou algum erro interno na server action
        if (responseUserCreateAction?.serverError) {
            toast(responseUserCreateAction.serverError)
            return
        }

        // Verificando se o resultado retornou como sucesso
        if(responseUserCreateAction?.data?.success) {
            // Enviando mensagem para o usuário
            toast.success(responseUserCreateAction.data.success)
            // Redirecionando o usuário para a tela de visualização de usuários
            router.push('/home/user')
        }
    }

    // Função executada ao clicar no botão cancelar
    function handleCancelForm() {
        confirmAlert({
            title: 'Confirmação de cancelamento',
            message: 'Os dados digitados serão perdidos, deseja cancelar?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => router.push('/home/user')
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

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

            <form className="w-full flex-1 flex flex-col gap-4 px-3 pb-3" onSubmit={handleFormSubmit}>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Dados pessoais
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Input {...register("name")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Nome do usuário"
                            icon="User"
                            errorsMessages={userCreateAction.result.validationErrors?.name?._errors} />
                        <Input {...register("email")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Email do usuários"
                            icon="AtSign"
                            errorsMessages={userCreateAction.result.validationErrors?.email?._errors} />
                    </div>
                    <div className="flex w-full gap-2">
                        <Input {...register("cellphone")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Celular"
                            icon="Smartphone"
                            errorsMessages={userCreateAction.result.validationErrors?.cellphone?._errors} />
                        <Input {...register("cpf")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="CPF do usuário"
                            icon="FileDigit"
                            errorsMessages={userCreateAction.result.validationErrors?.cpf?._errors} />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Endereço do usuário
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Input {...register("address")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Endereço"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address?._errors} />
                        <Input {...register("address_number")}
                            variant="zinc900"
                            className="w-80 h-min"
                            placeholder="Número"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address_number?._errors} />
                        <Input {...register("address_district")}
                            variant="zinc900"
                            className="w-96 h-min"
                            placeholder="Bairro"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address_district?._errors} />
                    </div>
                    <div className="flex w-full gap-2">
                        <Input {...register("address_complement")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Complemento"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address_complement?._errors} />
                        <Input {...register("address_cep")}
                            variant="zinc900"
                            className="w-80 h-min"
                            placeholder="CEP"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address_cep?._errors} />
                        <Input {...register("address_city")}
                            variant="zinc900"
                            className="w-md h-min"
                            placeholder="Cidade"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address_city?._errors} />
                        <Input {...register("address_uf")}
                            variant="zinc900"
                            className="w-md h-min"
                            placeholder="Estado"
                            icon="MapPinHouse"
                            errorsMessages={userCreateAction.result.validationErrors?.address_uf?._errors} />
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Segurança e privacidade
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Input {...register("password")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Escolha uma senha"
                            type="password"
                            icon="KeyRound"
                            errorsMessages={userCreateAction.result.validationErrors?.password?._errors} />
                        <Input {...register("confirm_password")}
                            variant="zinc900"
                            className="w-full h-min"
                            placeholder="Confirme a senha"
                            type="password"
                            icon="KeyRound"
                            errorsMessages={userCreateAction.result.validationErrors?.confirm_password?._errors} />
                        <Combobox placeholder="Perfil" data={profiles} />

                        <div className="items-top flex h-full pt-2 space-x-2">
                            <Checkbox id="terms1" defaultChecked />
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
                    <Button type="button" className="text-zinc-950" variant='destructive' size="lg" onClick={() => handleCancelForm()}>
                        Cancelar
                    </Button>
                    <Button type="submit" className="text-zinc-950" size="lg" isLoading={userCreateAction.isPending}>
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    )
}
