const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

const usuarios = LER_JSON('usuarios.json'); // Carrega os usuários do arquivo

const TIPO_LEITOR = 1;
const TIPO_ESCRITOR = 2;
const TIPO_EDITORA = 3;

const salvarUsuario = (usuario) => {
    usuario.id_usuario = GERAR_ID();
    usuarios.push(usuario);
    ESCREVER_JSON('usuarios.json', usuarios);
    return { status: 201, message: 'Usuário salvo com sucesso' };
};

const selecionarTipo = (tipo) => {
    // Lógica para criar um novo usuário com base no tipo
    let novoUsuario = {};
    switch (tipo) {
        case TIPO_LEITOR:
            // Cria um objeto com os atributos de um leitor
            novoUsuario = {
                tipo: TIPO_LEITOR,
                // ... outros atributos específicos para leitores
            };
            break;
        case TIPO_ESCRITOR:
            // Cria um objeto com os atributos de um escritor
            novoUsuario = {
                tipo: TIPO_ESCRITOR,
                // ... outros atributos específicos para escritores
            };
            break;
        case TIPO_EDITORA:
            // Cria um objeto com os atributos de uma editora
            novoUsuario = {
                tipo: TIPO_EDITORA,
                // ... outros atributos específicos para editoras
            };
            break;
        default:
            return { status: 400, message: 'Tipo de usuário inválido' };
    }
    return { status: 200, usuario: novoUsuario };
};

module.exports = {
    salvarUsuario,
    selecionarTipo
};