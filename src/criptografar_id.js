
const GERAR_LETRAS = () => {
    let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxysz"
    let aux_letras = [];

    letras = letras.split("");
    
    for(let i = 0; i < 4; i++) {
        aux_letras.unshift(letras[Math.floor(Math.random() * letras.length) + 1]);

    }

    aux_letras = aux_letras.join("");

    return aux_letras;
}

const CRIPTOGRAFAR_ID = (data = "") => {
    data = data.split("");
    data.sort(() => (Math.random() - 0.5));
    data = data.join("");

    return data;
}

module.exports = {
    GERAR_LETRAS,
    CRIPTOGRAFAR_ID
}