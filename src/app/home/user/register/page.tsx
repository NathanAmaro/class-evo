'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { userCreate } from "@/actions/user/user-create"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "@bprogress/next/app"
import { confirmAlert } from 'react-confirm-alert'
import { useHookFormMask } from 'use-mask-input'
import { removeMaskCEP, removeMaskCPF, removeMaskCellphone } from "@/lib/remove-masks"


interface IFormInputs {
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
    confirm_password: string,
    profile: 'ADMINISTRATOR' | 'USER',
    active: boolean
}

export default function UserRegisterPage() {
    const userCreateAction = useAction(userCreate)
    const router = useRouter()
    const { handleSubmit, control, register } = useForm<IFormInputs>({
        mode: "onSubmit",
        defaultValues: {
            name: '',
            email: '',
            cellphone: '',
            cpf: '',
            address: '',
            address_number: '',
            address_district: '',
            address_complement: '',
            address_cep: '',
            address_city: '',
            address_uf: '',
            password: '',
            confirm_password: '',
            profile: "USER",
            active: true
        }
    })
    const registerWithMask = useHookFormMask(register);

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
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {

        const responseUserCreateAction = await userCreateAction.executeAsync({
            name: data.name,
            email: data.email,
            ...data.cellphone && { cellphone: removeMaskCellphone(data.cellphone) },
            cpf: removeMaskCPF(data.cpf),
            address: data.address,
            address_number: data.address_number,
            address_district: data.address_district,
            address_complement: data.address_complement,
            ...data.address_cep && { address_cep: removeMaskCEP(data.address_cep) },
            address_city: data.address_city,
            address_uf: data.address_uf,
            password: data.password,
            confirm_password: data.confirm_password,
            type: data.profile,
            active: data.active
        })

        // Verificando se retornou algum erro de validação dos campos na server action
        if (responseUserCreateAction?.validationErrors) {
            return
        }

        // Verificando se retornou algum erro interno na server action
        if (responseUserCreateAction?.serverError) {
            toast(responseUserCreateAction.serverError)
            return
        }

        // Verificando se o resultado retornou como sucesso
        if (responseUserCreateAction?.data?.success) {
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
            <form className="w-full flex-1 flex flex-col gap-4 px-3 pb-3" onSubmit={handleSubmit(onSubmit)}>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Dados pessoais
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Nome do usuário"
                                    icon="User"
                                    errorsMessages={userCreateAction.result.validationErrors?.name?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Email do usuários"
                                    icon="AtSign"
                                    errorsMessages={userCreateAction.result.validationErrors?.email?._errors} />
                            )}
                        />


                    </div>
                    <div className="flex w-full gap-2">
                        <Controller
                            control={control}
                            name="cellphone"
                            render={({ field }) => (
                                <Input {...field}
                                    {...registerWithMask('cellphone', '(99) 99999-9999')}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Celular"
                                    icon="Smartphone"
                                    errorsMessages={userCreateAction.result.validationErrors?.cellphone?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="cpf"
                            render={({ field }) => (
                                <Input {...field}
                                    {...registerWithMask('cpf', '999.999.999-99')}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="CPF do usuário"
                                    icon="FileDigit"
                                    errorsMessages={userCreateAction.result.validationErrors?.cpf?._errors} />
                            )}
                        />

                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Endereço do usuário
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Controller
                            control={control}
                            name="address"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Endereço"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="address_number"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-80 h-min"
                                    placeholder="Número"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address_number?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="address_district"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-96 h-min"
                                    placeholder="Bairro"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address_district?._errors} />
                            )}
                        />

                    </div>
                    <div className="flex w-full gap-2">
                        <Controller
                            control={control}
                            name="address_complement"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Complemento"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address_complement?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="address_cep"
                            render={({ field }) => (
                                <Input {...field}
                                    {...registerWithMask('address_cep', '99999-999')}
                                    variant="zinc900"
                                    className="w-80 h-min"
                                    placeholder="CEP"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address_cep?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="address_city"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-md h-min"
                                    placeholder="Cidade"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address_city?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="address_uf"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-md h-min"
                                    placeholder="Estado"
                                    icon="MapPinHouse"
                                    errorsMessages={userCreateAction.result.validationErrors?.address_uf?._errors} />
                            )}
                        />

                    </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                    <span className="text-zinc-100 text-xl">
                        Segurança e privacidade
                    </span>
                    <Separator className="bg-zinc-800" />
                    <div className="flex w-full gap-2">
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Escolha uma senha"
                                    type="password"
                                    icon="KeyRound"
                                    errorsMessages={userCreateAction.result.validationErrors?.password?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field }) => (
                                <Input {...field}
                                    variant="zinc900"
                                    className="w-full h-min"
                                    placeholder="Confirme a senha"
                                    type="password"
                                    icon="KeyRound"
                                    errorsMessages={userCreateAction.result.validationErrors?.confirm_password?._errors} />
                            )}
                        />

                        <Controller
                            control={control}
                            name="profile"
                            render={({ field }) => (
                                <Combobox placeholder="Perfil"
                                    data={profiles}
                                    value={field.value}
                                    onSelect={field.onChange}
                                    errorsMessages={userCreateAction.result.validationErrors?.type?._errors}
                                />
                            )}
                        />

                        <div className="flex flex-col h-full pt-2">
                            <Controller
                                control={control}
                                name="active"
                                render={({ field }) => (
                                    <Checkbox defaultChecked
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        description="Usuário ativo?"
                                    />
                                )}
                            />
                        </div>

                    </div>
                </div>

                <Separator className="bg-zinc-800" />

                <div className="w-full flex gap-2 justify-end">
                    <Button type="button"
                        className="text-zinc-950"
                        variant='destructive'
                        size="lg"
                        onClick={() => handleCancelForm()}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit"
                        className="text-zinc-950"
                        size="lg"
                        isLoading={userCreateAction.isPending}
                    >
                        Salvar
                    </Button>
                </div>
            </form>

        </div>
    )
}
