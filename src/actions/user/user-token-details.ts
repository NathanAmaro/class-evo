'use server'

import { actionClient } from "@/lib/safe-action";
import { verifyUser } from "../auth/verify-user";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

/**
 * description: Action que consulta os dados do usuário utilizando o token contido no cookie
 */
export const userTokenDetails = actionClient.action(async () => {
    // Obtendo os cookies da requisição
    const cookieStore = await cookies()

    // Obtendo o token dentre os cookies da requisição
    const cookieToken = cookieStore.get('token')

    // Verificando se o token não foi localizado no cookie da requisição
    if (!cookieToken) {

        // Redirecionando o usuário para a página de login
        redirect('/login')
    }

    try {

        const verifyUserResponse = await verifyUser({token: cookieToken.value})

        // Verificando se o action retornou algum erro e redirecionando para a página login
        if (verifyUserResponse?.serverError || verifyUserResponse?.validationErrors) {
            redirect('/login')
        }

        return verifyUserResponse?.data

    } catch {
        // Redirecionando o usuário para a página "login"
        redirect('/login')
    }
})