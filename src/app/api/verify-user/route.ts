import { verifyUser } from "@/actions/auth/verify-user";

export async function POST(request: Request) {

    // Capturando o token no cabeçalho da requisição
    const token = request.headers.get("Authorization")?.split(' ')[1]

    // Verificando se o token não existe no cabeçalho da requisição
    if (!token) {
        return new Response('Invalid token', {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    //Verificando o token usuário
    const verify = await verifyUser({ token: token })

    // Validando se a verificação de usuário falhou
    if (verify?.serverError) {
        
        //Redirecionando o usuário para a página de login
        return new Response('Invalid token', {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Retornando o status 200 e os dados do usuário
    return new Response(JSON.stringify({
        "user": verify?.data?.user
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}