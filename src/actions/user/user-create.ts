'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../prisma/client";
import bcrypt from "bcrypt";
import vlcpf from 'validar-cpf';

const schema = z.object({
    name: z.string({ message: "O nome é obrigatório." }),
    cellphone: z.string()
        .min(11, "A quantidade de dígitos no telefone é inválida.")
        .max(11, "A quantidade de dígitos no telefone é inválida.")
        .optional(),
    email: z.string({ message: "O email é obrigatório." })
        .email("O email é inválido."),
    cpf: z.string()
        .min(11, "A quantidade de dígitos no CPF é inválida.")
        .max(11, "A quantidade de números no CPF é inválida."),
    password: z.string({ message: "A senha é obrigatória." })
        .min(8, "A senha deve ter no mínimo 8 caracteres.")
        .regex(new RegExp(/[a-zA-Z]/), 'A senha deve conter ao menos uma letra.')
        .regex(new RegExp(/\d/), 'A senha deve conter ao menos um número.')
        .regex(new RegExp(/\W+|_/), 'A senha deve conter ao menos um caractere especial.'),
    confirm_password: z.string({ message: "A confirmação de senha é obrigatória." }),
    active: z.boolean()
        .default(true),
    type: z.enum(["ADMINISTRATOR", "USER"])
        .default("USER"),
    address: z.string().optional(),
    address_number: z.string().optional(),
    address_cep: z.string().optional(),
    address_complement: z.string().optional(),
    address_district: z.string().optional(),
    address_city: z.string().optional(),
    address_uf: z.string().optional(),
}).refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"], // Onde será exibido o erro
});


/**
 * description: Action que cria um novo usuário
 */
export const userCreate = actionClient.schema(schema).action(async ({ parsedInput }) => {

    // Validando o CPF
    if (!vlcpf(parsedInput.cpf)) {
        throw new Error("O CPF é inválido.")
    }

    // Consultando se já existe algum usuário com esse CPF
    const userCPF = await prisma.user.findUnique({
        where: {
            cpf: parsedInput.cpf
        }
    })

    // Verificando se já existe algum usuário com o CPF
    if (userCPF) {
        throw new Error("Já existe um usuário com este CPF.")
    }

    // Consultando se já existe algum usuário com esse email
    const userEmail = await prisma.user.findUnique({
        where: {
            email: parsedInput.email
        }
    })

    // Verificando se já existe algum usuário com o email
    if (userEmail) {
        throw new Error("Já existe um usuário com este email.")
    }

    // Consultando se já existe algum usuário com esse número de telefone
    const userCellphone = await prisma.user.findFirst({
        where: {
            cellphone: parsedInput.cellphone
        }
    })

    // Verificando se já existe algum usuário com este número de telefone
    if (userCellphone) {
        throw new Error("Já existe um usuário com este número de telefone")
    }

    // Criptografando a senha
    const passwordHashed = bcrypt.hashSync(parsedInput.password, 10)

    try {

        // Cadastrando o novo usuário
        const newUser = await prisma.user.create({
            data: {
                cpf: parsedInput.cpf,
                email: parsedInput.email,
                name: parsedInput.name,
                password: passwordHashed,
                active: parsedInput.active,
                address: parsedInput.address,
                address_cep: parsedInput.address_cep,
                address_city: parsedInput.address_city,
                address_complement: parsedInput.address_complement,
                address_district: parsedInput.address_district,
                address_number: parsedInput.address_number,
                address_uf: parsedInput.address_uf,
                cellphone: parsedInput.cellphone,
                type: parsedInput.type
            }
        })

        // Verificando se o usuário não foi cadastrado com sucesso
        if (!newUser) {
            throw new Error("Ocorreu um erro interno ao tentar cadastrar o usuário. Tente novamente mais tarde.")
        }

        return {
            success: "O novo usuário foi cadastrado com sucesso."
        }

    } catch {
        throw new Error("Ocorreu um erro interno ao tentar processar sua solicitação. Tente novamente mais tarde.")
    }
})