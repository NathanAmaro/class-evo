'use server'

import { actionClient } from "@/lib/safe-action";
import { verifyUser } from "../auth/verify-user";
import { prisma } from "../../../prisma/client";
import { getUserToken } from "@/actions/auth/get-user-token";


/**
 * description: Action que retorna uma lista de todos usuários cadastrados
 */
export const usersList = actionClient.action(async () => {

    // Obtendo o token do usuário
    const userToken = await getUserToken()

    // Consultando o usuário através do token
    const verifyUserResponse = await verifyUser({ token: userToken })

    // Verificar se o usuário requisitante é administrador
    if (verifyUserResponse?.data?.user.type != 'ADMINISTRATOR') {
        throw new Error('Esta ação requer acesso de administrador.')
    }

    // Consultado a lista de usuário completa
    const usersList = await prisma.user.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return usersList
})