import { userCreate } from '@/actions/user/user-create';
import { prisma } from './../client';
import { env } from '../../env';


/**
 * description: Criação do usuário master do sistema
 */
export async function createMasterUser() {

    // Consultando o email escolhido no banco de dados
    const user = await prisma.user.findUnique({
        where: {
            email: env.MASTER_USER_EMAIL
        }
    })

    // Se já existir um usuário com o email escolhido
    if (user) {
        throw new Error("Já existe um usuário com o email escolhido. Semeação do Usuário Master cancelada.")
    }

    // Enviando os dados para o server action de criação de usuário
    const userResult = await userCreate({
        name: "Nathannael Amaro",
        cpf: env.MASTER_USER_CPF,
        email: env.MASTER_USER_EMAIL,
        password: env.MASTER_USER_PASSWORD,
        confirm_password: env.MASTER_USER_PASSWORD,
        type: "ADMINISTRATOR"
    })

    // Verificando se retornou algum erro de validação
    if (userResult?.validationErrors) {
        console.log(`Ocorreu um erro de validação na criação do usuário master. Operação cancelada. ${JSON.stringify(userResult.validationErrors)}`)
    }

    // Verificando se retornou algum erro interno
    if (userResult?.serverError) {
        console.log(`Ocorreu um erro interno na criação do usuário master. Operação cancelada. ${userResult.serverError}`)
    }

    // Mostrando a mensagem do cadastro com sucesso
    console.log(userResult?.data?.success)
}