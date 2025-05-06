'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { useEffect, useContext } from 'react';
import { userTokenDetails } from '@/actions/user/user-token-details';
import { useAction } from 'next-safe-action/hooks';
import { UserContext, UserProvider } from '@/context/UserContext';
import { Toaster } from 'sonner';


// Provider responsável por realizar a consulta inicial dos dados do usuário ao acessar as páginas
export const VerifyUserProvider = ({ children }: { children: React.ReactNode }) => {
  const userTokenDetailsAction = useAction(userTokenDetails);
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    // Função assíncrona executada sempre que o usuário acessa a página
    async function initialUserDataFetch() {

      // Executando a action para receber os dados do usuário
      const userTokenDetailsResponse = await userTokenDetailsAction.executeAsync()

      // Verificando se retornou alguma informação da action
      if (userTokenDetailsResponse?.data) {

        // Adicionando as informações do usuário no contexto
        setUser({
          name: userTokenDetailsResponse.data.user.name,
          type: userTokenDetailsResponse.data.user.type
        })
      }

    }

    initialUserDataFetch()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <UserProvider>
      <ProgressProvider
        height="2px"
        color="#4ade80" // bg-green-400
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}

        <Toaster />
      </ProgressProvider>
    </UserProvider>
  );
};