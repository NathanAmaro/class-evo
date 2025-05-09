import bcrypt from "bcrypt";

export function pswHash(password: string) {
    const passwordHashed = bcrypt.hashSync(password, 10)

    return passwordHashed
}