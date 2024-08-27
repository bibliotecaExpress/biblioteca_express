const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

// Carrega as editoras do arquivo
const editoras = LER_JSON('editoras.json');

const modelEditora = (body, id = GERAR_ID()) => ({
  id_editora: id,
  nome_editora: body.nome_editora,
  biblioteca_contratos: []
});

// Funções CRUD

const indexEditoras = () => editoras;

const showEditora = (id) => editoras.find((el) => el.id_editora === id) || null;

const createEditora = (body) => {
  const novaEditora = modelEditora(body);
  editoras.push(novaEditora);
  ESCREVER_JSON('editoras.json', editoras);
  return { status: 201, message: 'Editora criada com sucesso' };
};

const updateEditora = (body, id) => {
  const indice = editoras.findIndex((el) => el.id_editora === id);
  if (indice !== -1) {
    editoras[indice] = { ...editoras[indice], ...body };
    ESCREVER_JSON('editoras.json', editoras);
    return { status: 200, message: 'Editora atualizada com sucesso' };
  }
  return { status: 404, message: 'Editora não encontrada' };
};

const deleteEditora = (id) => {
  const indice = editoras.findIndex((el) => el.id_editora === id);
  if (indice !== -1) {
    editoras.splice(indice, 1);
    ESCREVER_JSON('editoras.json', editoras);
    return { status: 204, message: 'Editora removida com sucesso' };
  }
  return { status: 404, message: 'Editora não encontrada' };
};

// Funções para gerenciar contratos

const addContrato = (idEditora, contrato) => {
  const editora = showEditora(idEditora);
  if (editora) {
    editora.biblioteca_contratos.push(contrato);
    ESCREVER_JSON('editoras.json', editoras);
    return { status: 200, message: 'Contrato adicionado com sucesso' };
  }
  return { status: 404, message: 'Editora não encontrada' };
};

// ... outras funções para gerenciar contratos

module.exports = {
  createEditora,
  indexEditoras,
  showEditora,
  updateEditora,
  deleteEditora,
  addContrato
};