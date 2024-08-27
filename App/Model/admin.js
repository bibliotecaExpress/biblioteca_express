const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

const admin = {
  biblioteca_usuarios: LER_JSON('usuarios.json'),
  senha: 'senha_secreta' // Substituir por uma senha segura
};

const registrarUsuario = (usuario) => {
  usuario.id = GERAR_ID();
  admin.biblioteca_usuarios.push(usuario);
  ESCREVER_JSON('usuarios.json', admin.biblioteca_usuarios);
  return { status: 201, message: 'Usuário registrado com sucesso' };
};

const atualizarUsuario = (idUsuario, novosDados) => {
  const usuario = admin.biblioteca_usuarios.find(u => u.id === idUsuario);
  if (usuario) {
    Object.assign(usuario, novosDados);
    ESCREVER_JSON('usuarios.json', admin.biblioteca_usuarios);
    return { status: 200, message: 'Usuário atualizado com sucesso' };
  }
  return { status: 404, message: 'Usuário não encontrado' };
};

const apagarUsuario = (idUsuario) => {
  const indice = admin.biblioteca_usuarios.findIndex(u => u.id === idUsuario);
  if (indice !== -1) {
    admin.biblioteca_usuarios.splice(indice, 1);
    ESCREVER_JSON('usuarios.json', admin.biblioteca_usuarios);
    return { status: 204, message: 'Usuário apagado com sucesso' };
  }
  return { status: 404, message: 'Usuário não encontrado' };
};

const listarUsuarios = () => {
  return admin.biblioteca_usuarios;
};

// Função para autenticar o administrador
const autenticarAdmin = (senha) => {
  return senha === admin.senha;
};

module.exports = {
  registrarUsuario,
  atualizarUsuario,
  apagarUsuario,
  listarUsuarios,
  autenticarAdmin
};