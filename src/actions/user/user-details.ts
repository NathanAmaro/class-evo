'use server'

import { actionClient } from "@/lib/safe-action";
import { verifyUser } from "../auth/verify-user";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { prisma } from "../../../prisma/client";
import { z } from "zod";

const userDetailsSchema = z.object({
    id: z.string({ message: "O id do usuário é obrigatório." }),
});

/**
 * description: Action que retorna os dados de um usuário cadastrado
 */
export const userDetails = actionClient.schema(userDetailsSchema).action(async ({ parsedInput }) => {
    // Obtendo os cookies da requisição
    const cookieStore = await cookies()

    // Obtendo o token dentre os cookies da requisição
    const cookieToken = cookieStore.get('token')

    // Verificando se o token não foi localizado no cookie da requisição
    if (!cookieToken) {

        // Redirecionando o usuário para a página de login
        redirect('/login')
    }

    // Verificando o token do usuário
    try {

        // Consultando o usuário através do token
        const verifyUserResponse = await verifyUser({token: cookieToken.value})

        // Verificando se o action retornou algum erro e redirecionando para a página login
        if (verifyUserResponse?.serverError || verifyUserResponse?.validationErrors) {
            redirect('/login')
        }

        // Verificando se o usuário requisitante é administrador
        if (verifyUserResponse?.data?.user.type != 'ADMINISTRATOR') {
            throw new Error('Esta ação requer acesso de administrador.')
        }

    } catch {
        // Redirecionando o usuário para a página "login"
        redirect('/login')
    }

    // Consultado a lista de usuário completa
    const userDetails = await prisma.user.findUnique({
        where: {
            id: parsedInput.id
        }
    })
    
    return userDetails
})