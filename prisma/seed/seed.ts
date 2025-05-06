import { prisma } from './../client'
import { createMasterUser } from './create-master-user'


async function main() {

    // Criando o usuário master
    await createMasterUser()
    
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
