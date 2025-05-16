'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../prisma/client";
import { env } from "../../../env";
import * as jose from "jose";
import { redirect } from "next/navigation";

const schema = z.object({
    token: z.string()
});


/**
 * description: Action que verifica o token do usuário
 */
export const verifyUser = actionClient.schema(schema).action(async ({ parsedInput }) => {

    // Codificando a chave secreta
    const secret = new TextEncoder().encode(env.JWT_SECRET)

    try {
        // Decodificando o token
        const tokenDecoded = await jose.jwtVerify(parsedInput.token, secret)

        // Consultando o id do usuário no banco de dados
        const userConsult = await prisma.user.findUnique({
            where: {
                id: tokenDecoded.payload.user as string
            }
        })

        // Verificando se algum usuário possui esse id
        if (!userConsult) {
            throw new Error("Nenhum usuário localizado.")
        }

        // Verificando se o usuário está ativo
        if (!userConsult.active) {
            throw new Error("O usuário não está ativo.")
        }

        // Retornando os dados do usuário
        return {
            user: {
                id: userConsult.id,
                name: userConsult.name,
                type: userConsult.type
            }
        }

    } catch (e) {
        console.log(e)
        
        // Verificando se o action retornou algum erro e redirecionando para a página login
        redirect('/login')
    }
})