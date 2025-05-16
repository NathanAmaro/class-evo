
/**
 * @description Função que remove máscara do número do celular
 */
export function removeMaskCellphone(cellphone: string) {
    return cellphone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '')
}

/**
 * @description Função que remove máscara do CEP
 */
export function removeMaskCEP(cep: string) {
    return cep.replaceAll('-', '')
}