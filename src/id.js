const {GERAR_LETRAS, CRIPTOGRAFAR_ID} = require("../src/criptografar_id.js");

let id = 0;


const GERAR_ID = () => {
    let aux_id= id + GERAR_LETRAS();
    aux_id  = CRIPTOGRAFAR_ID(aux_id);
    id++;

    return aux_id;
}

module.exports = {
    GERAR_ID
}