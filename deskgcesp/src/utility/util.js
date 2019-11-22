const invalids = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999', '01234567890']
export const isValidCPF = (cpf) => {
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('-', '')
    if (cpf.length != 11)
        return false;
    if (invalids.includes(cpf))
        return false;

    var soma, resto, i;
    soma = 0;
    for (i = 0; i < 9; i++)
        soma = soma + parseInt(cpf.charAt(i)) * (10 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(cpf.charAt(9)))
        return false;

    soma = 0;
    for (i = 0; i < 10; i++)
        soma = soma + parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

export const isValidEmail = (email) => {
    if (!email.includes('@'))
        return false;
    else if (email.startsWith('@') || email.endsWith('@'))
        return false;
    else if (!email.includes('.'))
        return false;
    else if (email.startsWith('.') || email.endsWith('.'))
        return false;
    return true;

}