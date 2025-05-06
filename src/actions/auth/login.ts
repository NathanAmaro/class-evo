'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../prisma/client";
import { env } from "../../../env";
import { cookies } from 'next/headers';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const schema = z.object({
    email: z.string()
        .nonempty("O email é obrigatório.")
        .email("O email é inválido."),
    password: z.string()
        .nonempty("A senha é obrigatória.")
});


/**
 * description: Action que realiza o login do usuário
 */
export const login = actionClient.schema(schema).action(async ({ parsedInput }) => {

    // Consultando o email no banco de dados
    const userConsult = await prisma.user.findUnique({
        where: {
            email: parsedInput.email
        }
    })

    // Verificando se algum usuário possui o email informado
    if (!userConsult) {
        throw new Error("Email ou senha inválidos.")
    }

    // Verificando se o usuário está ativo
    if (!userConsult.active) {
        throw new Error("O usuário não está ativo.")
    }

    // Comparando a senha informada com a senha encontrada no banco de dados
    const comparePassword = bcrypt.compareSync(parsedInput.password, userConsult.password)

    // Verificando se as senhas não coincidem
    if (!comparePassword) {
        throw new Error("Email ou senha inválidos.")
    }

    // Gerando o token para o usuário
    const token = jwt.sign(
        {
            user: userConsult.id
        },
        env.JWT_SECRET,
        {
            expiresIn: '3h'
        }
    )

    // Obtendo os cookies da requisição
    const cookieStore = await cookies()

    // Adicionando o token aos cookies do cliente
    cookieStore.set('token', token)

    // Retornando os dados do usuário
    return {
        user: {
            name: userConsult.name, 
            type: userConsult.type
        }
    }
})