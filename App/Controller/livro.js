const {GERAR_ID} = require("../../src/id.js");
let id = GERAR_ID();

const model = (livro, id_livro = id) => {
    if(livro.nome_livro != undefined && livro.nome_livro != "") {
        return {
            id_livro,
            nome_livro: livro.nome_livro,
            id_escritor: escritor.id_escritor,
            nome_escritor: escritor.nome_escritor
        };
    }
};