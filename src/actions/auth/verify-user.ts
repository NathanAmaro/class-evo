'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../prisma/client";
import { env } from "../../../env";
import * as jose from "jose";

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
        const tokenDecoded: jose.JWTVerifyResult<{user: string, iat: number, exp: number}> = await jose.jwtVerify(parsedInput.token, secret)

        // Consultando o id do usuário no banco de dados
        const userConsult = await prisma.user.findUnique({
            where: {
                id: tokenDecoded.payload.user
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
        throw new Error('Ocorreu um erro ao verificar o usuário.')
    }
})