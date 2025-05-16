
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