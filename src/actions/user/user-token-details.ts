'use server'

import { actionClient } from "@/lib/safe-action";
import { verifyUser } from "../auth/verify-user";
import { redirect } from "next/navigation";
import { getUserToken } from "../auth/get-user-token";

/**
 * description: Action que consulta os dados do usuário utilizando o token contido no cookie
 */
export const userTokenDetails = actionClient.action(async () => {

    // Obtendo o token do usuário
    const userToken = await getUserToken()

    try {

        const verifyUserResponse = await verifyUser({ token: userToken })

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