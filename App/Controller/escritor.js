const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

// Carrega os escritores do arquivo
const escritores = LER_JSON('escritores.json');

const modelEscritor = (body, id = GERAR_ID()) => ({
  id_escritor: id,
  nome_escritor: body.nome_escritor,
  biblioteca: [], // Inicializa a biblioteca vazia
  historico_escritor: []
});

// Funções CRUD

const indexEscritores = () => escritores;

const showEscritor = (id) => escritores.find((el) => el.id_escritor === id) || null;

const createEscritor = (body) => {
  const novoEscritor = modelEscritor(body);
  escritores.push(novoEscritor);
  ESCREVER_JSON('escritores.json', escritores);
  return { status: 201, message: 'Escritor criado com sucesso' };
};

const updateEscritor = (body, id) => {
  const indice = escritores.findIndex((el) => el.id_escritor === id);
  if (indice !== -1) {
    escritores[indice] = { ...escritores[indice], ...body };
    ESCREVER_JSON('escritores.json', escritores);
    return { status: 200, message: 'Escritor atualizado com sucesso' };
  }
  return { status: 404, message: 'Escritor não encontrado' };
};

const deleteEscritor = (id) => {
  const indice = escritores.findIndex((el) => el.id_escritor === id);
  if (indice !== -1) {
    escritores.splice(indice, 1);
    ESCREVER_JSON('escritores.json', escritores);
    return { status: 204, message: 'Escritor removido com sucesso' };
  }
  return { status: 404, message: 'Escritor não encontrado' };
};

module.exports = {
  createEscritor,
  indexEscritores,
  showEscritor,
  updateEscritor,
  deleteEscritor
};