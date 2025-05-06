'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../prisma/client";
import { env } from "../../../env";
import * as jose from "jose";

const schema = z.object({
    token: z.string()
        .nonempty("A senha é obrigatória.")
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
                name: userConsult.name,
                type: userConsult.type
            }
        }

    } catch (e) {
        console.log(e)
        throw new Error("A verificação do token falhou.")
    }
})