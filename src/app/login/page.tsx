'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { login } from "@/actions/auth/login";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner";
import { useRouter } from '@bprogress/next/app';

type IFormInputs = {
    email: string,
    password: string
}

export default function LoginPage() {
    const loginAction = useAction(login);
    const { handleSubmit, control } = useForm<IFormInputs>({
        mode: "onSubmit",
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const router = useRouter();


    // Função executada ao clicar no botão entrar
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {

        const responseLoginAction = await loginAction.executeAsync({
            email: data.email,
            password: data.password
        })

        // Verificando se retornou algum erro de validação na server action
        if (responseLoginAction?.validationErrors) {
            return
        }

        // Verificando se retornou algum erro interno na server action
        if (responseLoginAction?.serverError) {
            toast(responseLoginAction.serverError)
            return
        }

        // Redirecionando o usuário para a página "home"
        router.push('/home')
    }


    return (
        <div className="w-full flex flex-col justify-center items-center space-y-4">
            <span className="text-2xl text-zinc-100">
                Realizar Login
            </span>

            {/*FORM*/}
            <form className="w-full flex flex-col justify-center items-center space-y-11" onSubmit={handleSubmit(onSubmit)}>
                {/*INPUTS*/}
                <div className="w-xl flex flex-col space-y-4">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Input {...field}
                                variant="zinc900"
                                placeholder="Digite seu email"
                                icon="AtSign"
                                errorsMessages={loginAction.result.validationErrors?.email?._errors}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input {...field}
                                variant="zinc900"
                                placeholder="Digite sua senha"
                                icon="KeyRound"
                                type="password"
                                errorsMessages={loginAction.result.validationErrors?.password?._errors}
                            />
                        )}
                    />

                    <Button type="button" variant="link" size="clean" className="text-zinc-300 text-xs">
                        Esqueci minha senha
                    </Button>
                </div>
                {/*BUTTON*/}
                <div className="flex flex-col w-full px-24">
                    <Button type="submit" size="lg" isLoading={loginAction.isPending}>
                        Entrar
                    </Button>
                </div>
            </form>

        </div>
    )
}
