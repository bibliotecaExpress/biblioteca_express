const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

const model = (body, id = GERAR_ID()) => ({
  id_livro: id,
  nome_livro: body.nome_livro,
  id_editora: body.id_editora,
  id_escritor: body.id_escritor
});

const livros = LER_JSON('livros.json');

const index = () => livros;

const show = (id) => livros.find((el) => el.id_livro === id) || null;

const store = (body) => {
  const novoLivro = model(body);
  livros.push(novoLivro);
  ESCREVER_JSON('livros.json', livros);
  return { status: 201, message: 'Livro criado com sucesso' };
};

const update = (body, id) => {
  const indice = livros.findIndex((el) => el.id_livro === id);
  if (indice !== -1) {
    livros[indice] = model({ ...livros[indice], ...body }, id);
    ESCREVER_JSON('livros.json', livros);
    return { status: 200, message: 'Livro atualizado com sucesso' };
  }
  return { status: 404, message: 'Livro não encontrado' };
};

const destroy = (id) => {
  const indice = livros.findIndex((el) => el.id_livro === id);
  if (indice !== -1) {
    livros.splice(indice, 1);
    ESCREVER_JSON('livros.json', livros);
    return { status: 204, message: 'Livro removido com sucesso' };
  }
  return { status: 404, message: 'Livro não encontrado' };
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};