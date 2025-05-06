import {z} from 'zod'

// Schema do zod para validar as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(), // postgresql://userexample:123@localhost:5432/dbexample?schema=public'
    MASTER_USER_EMAIL: z.string().email(),
    MASTER_USER_PASSWORD: z.string(),
    MASTER_USER_CPF: z.string(),
    JWT_SECRET: z.string()
})

export const env = envSchema.parse(process.env)