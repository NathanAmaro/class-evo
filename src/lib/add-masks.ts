
/**
 * @description Função que adiciona máscara no CPF
 */
export function addMaskCPF(cpf: string) {
    const cpfSplited = cpf.split('')

    return `${cpfSplited[0]}${cpfSplited[1]}${cpfSplited[2]}.${cpfSplited[3]}${cpfSplited[4]}${cpfSplited[5]}.${cpfSplited[6]}${cpfSplited[7]}${cpfSplited[8]}-${cpfSplited[9]}${cpfSplited[10]}`
}

/**
 * @description Função que adiciona máscara no Número de Celular
 */
export function addMaskCellphone(cellphone: string) {
    const cellphoneSplited = cellphone.split('')
    return `(${cellphoneSplited[0]}${cellphoneSplited[1]}) ${cellphoneSplited[2]}${cellphoneSplited[3]}${cellphoneSplited[4]}${cellphoneSplited[5]}${cellphoneSplited[6]}-${cellphoneSplited[7]}${cellphoneSplited[8]}${cellphoneSplited[9]}${cellphoneSplited[10]}`

}

/**
 * @description Função que adiciona/traduz os tipos de usuários
 */
export function addMaskProfile(profile: "ADMINISTRATOR" | "USER") {
    switch (profile) {
        case "ADMINISTRATOR":
            return 'Administrador'
        case "USER":
            return 'Usuário'
    }
}