'use server'

import { cookies } from 'next/headers';
import { redirect } from "next/navigation";


/**
 * @description Action que retorna o token do usuário obtido no cookie da requisição
 */
export async function getUserToken() {
    // Obtendo os cookies da requisição
    const cookieStore = await cookies()

    // Obtendo o token dentre os cookies da requisição
    const cookieToken = cookieStore.get('token')

    // Verificando se o token não foi localizado no cookie da requisição
    if (!cookieToken) {

        // Redirecionando o usuário para a página de login
        return redirect('/login')
    }

    // Retornando o token do usuário
    return cookieToken.value
}