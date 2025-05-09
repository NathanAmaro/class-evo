'use server'

import { z } from "zod";
import { actionClient } from "../../lib/safe-action";
import { prisma } from "../../../prisma/client";
import { pswHash } from '../../lib/psw-hash'

const userEditSchema = z.object({
    id: z.string({ message: "O id do usuário é obrigatório" }),
    name: z.string({ message: "O nome é obrigatório." }),
    cellphone: z.string()
        .min(11, "A quantidade de dígitos no telefone é inválida.")
        .max(11, "A quantidade de dígitos no telefone é inválida.")
        .optional(),
    password: z.union([
        z.string()
            .optional(),
        z.string()
            .min(8, "A senha deve ter no mínimo 8 caracteres."),
        z.string()
            .regex(new RegExp(/[a-zA-Z]/), 'A senha deve conter ao menos uma letra.'),
        z.string()
            .regex(new RegExp(/\d/), 'A senha deve conter ao menos um número.'),
        z.string()
            .regex(new RegExp(/\W+|_/), 'A senha deve conter ao menos um caractere especial.')
    ])
        .optional()
        .transform(e => e === "" ? undefined : e),
    confirm_password: z.string().optional(),
    active: z.boolean(),
    type: z.enum(["ADMINISTRATOR", "USER"], { message: "O perfil é obrigatório." }),
    address: z.string().optional(),
    address_number: z.string().optional(),
    address_cep: z.string().optional(),
    address_complement: z.string().optional(),
    address_district: z.string().optional(),
    address_city: z.string().optional(),
    address_uf: z.string().optional(),
}).refine((data) => data.confirm_password === '' ? true : data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"], // Onde será exibido o erro
});


/**
 * description: Action que edita um usuário
 */
export const userEdit = actionClient.schema(userEditSchema).action(async ({ parsedInput }) => {

    // Consultando se já existe algum usuário com esse número de telefone que não seja o usuário alvo
    const userCellphone = await prisma.user.findFirst({
        where: {
            id: {
                not: parsedInput.id
            },
            cellphone: parsedInput.cellphone
        }
    })

    // Verificando se já existe algum usuário com este número de telefone
    if (userCellphone) {
        throw new Error("Já existe um usuário com este número de telefone")
    }

    try {

        // Cadastrando o novo usuário
        const userEdited = await prisma.user.update({
            where: {
                id: parsedInput.id
            },
            data: {
                name: parsedInput.name,
                ...parsedInput.password && { password: pswHash(parsedInput.password) },
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

        return {
            success: "Alterações realizadas com sucesso."
        }

    } catch {
        throw new Error("Ocorreu um erro interno ao tentar processar sua solicitação. Tente novamente mais tarde.")
    }
})