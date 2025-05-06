import {z} from 'zod'

// Schema do zod para validar as variáveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(), // postgresql://userexample:123@localhost:5432/dbexample?schema=public
    MASTER_USER_EMAIL: z.string().email(), // nathannael_g3@hotmail.com
    MASTER_USER_PASSWORD: z.string(), // classevo
    MASTER_USER_CPF: z.string(), // 15418180754
    JWT_SECRET: z.string() // CLASSEVO
})

export const env = envSchema.parse(process.env)