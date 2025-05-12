'use server'

import { actionClient } from "@/lib/safe-action";
import { verifyUser } from "../auth/verify-user";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { prisma } from "../../../prisma/client";
import { z } from "zod";

const userRemoveSchema = z.object({
    id: z.string({ message: "O id do usuário é obrigatório." }),
});

/**
 * description: Action que exclui os dados de um usuário cadastrado
 */
export const userRemove = actionClient.schema(userRemoveSchema).action(async ({ parsedInput }) => {
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
        const verifyUserResponse = await verifyUser({ token: cookieToken.value })

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

    try {
        const userRemove = await prisma.user.delete({
            where: {
                id: parsedInput.id
            }
        })

        return {
            success: 'O usuário foi excluído com sucesso.'
        }

    } catch {
        throw new Error("Não foi possível excluir o usuário.")
    }
})