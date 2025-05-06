'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type resVerifyUserAPI = {
    user: {
        name: string, 
        type: 'ADMINISTRATOR' | 'USER'
    }
}

const protectedRoutes = [
    { path: '/home/user', roles: ['ADMINISTRATOR'] },
    { path: '/home/user/register', roles: ['ADMINISTRATOR'] },
    { path: '/home/user/edit/[id]', roles: ['ADMINISTRATOR'] },
  ];

// Function to match the current route
const findCurrentRoute = (pathname: string) => {
    return protectedRoutes.find(route => new RegExp(`^${route.path.replace(/\[\w+\]/g, '\\w+')}$`).test(pathname));
};

export async function middleware(request: NextRequest) {
    const nextResponse = NextResponse.next()
    const token = request.cookies.get('token')

    // Verificando se o token não está presente no cookie
    if (!token) {
        // Redirecionando o usuário para a página de login
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Realizando requisição para a rota de API que verifica o usuário
    const verifyResponse = await fetch(`${request.nextUrl.origin}/api/verify-user`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token.value}`
        }
    })

    // Verificando se a requisição retornou inválida
    if (verifyResponse.status != 200) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Convertendo em json a resposta bem sucedida
    const verifyReponseJson: resVerifyUserAPI = await verifyResponse.json()

    // Verificando se a rota possui alguma regra de restrição
    const currentRoute = findCurrentRoute(request.nextUrl.pathname);

    // Se a rota for protegida
    if (currentRoute) { 
        // Se o usuário não possui os privilégios necessários para a rota   
        if (!currentRoute.roles.includes(verifyReponseJson.user.type)) {
          return NextResponse.redirect(new URL('/login', request.url));
        }
      }
/*
    // Verificando se a página é protegida com privilégios de administrador
    if (config.administrator.includes(request.nextUrl.pathname)) {

        // Verificando se o usuário não é do tipo administrador
        if (verifyReponseJson.user.type != 'ADMINISTRATOR') {
            // Se o usuário não for administrador, redirecionando ele para a página home
            return NextResponse.redirect(new URL('/home', request.url))
        }
    }
    */
    return nextResponse
}

// matcher: Páginas protegidas exigindo autenticação
// administrator: Páginas que somente usuários do tipo "ADMINISTRATOR" podem acessar
export const config = {
    matcher: ['/home/:path*'],
}
