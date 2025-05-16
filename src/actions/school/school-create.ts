'use server'

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "../../../prisma/client";
import bcrypt from "bcrypt";
import { cnpj } from 'cpf-cnpj-validator';
import { getUserToken } from "../auth/get-user-token";
import { verifyUser } from "../auth/verify-user";

const schoolCreateSchema = z.object({
    name: z.string({ message: "O nome da escola é obrigatório." }),
    cnpj: z.string({ message: "O CNPJ é obrigatório." })
        .min(14, "A quantidade de dígitos no CNPJ é inválida.")
        .max(14, "A quantidade de dígitos no CNPJ é inválida."),
    address: z.string({ message: "O endereço é obrigatório." }),
    address_number: z.string({ message: "O número do endereço é obrigatório." }),
    address_cep: z.string({ message: "O CEP é obrigatório." }),
    address_complement: z.string().optional(),
    address_district: z.string({ message: "O bairro é obrigatório." }),
    address_city: z.string({ message: "A cidade é obrigatória." }),
    address_uf: z.string({ message: "O estado é obrigatório." }),
    name_director: z.string().optional(),
    name_vice_director: z.string().optional(),
    name_secretary: z.string().optional(),
    name_coordinator: z.string().optional()
})


/**
 * description: Action que cria uma nova escola
 */
export const schoolCreate = actionClient.schema(schoolCreateSchema).action(async ({ parsedInput }) => {

    // Obtendo o token do usuário
    const userToken = await getUserToken()

    // Consultando o usuário através do token
    const verifyUserResponse = await verifyUser({ token: userToken })

    // Validar o CEP

    // Validando o CNPJ
    if (!cnpj.isValid(parsedInput.cnpj)) {
        throw new Error("O CNPJ é inválido.")
    }

    // Consultando se já existe algum usuário com esse CPF
    const schoolCNPJ = await prisma.school.findUnique({
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