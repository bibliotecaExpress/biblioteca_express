const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

const model = (body, id = GERAR_ID()) => ({
  id_livro: id,
  nome_livro: body.nome_livro,
  id_editora: body.id_editora,
  id_escritor: body.id_escritor
});  // definição do modelo

const livros = LER_JSON('livros.json'); // verificar vjson

const index = () => livros;

const show = (id) => livros.find((el) => el.id_livro === id) || null; // mostrar

const store = (body) => {
  const novoLivro = model(body); // atribuindo como modelo
  livros.push(novoLivro);
  ESCREVER_JSON('livros.json', livros); // salvando como json
  return { status: 201, message: 'Livro criado com sucesso' }; // armazenar
};

const update = (body, id) => {
  const indice = livros.findIndex((el) => el.id_livro === id); // procurando o indice
  if (indice !== -1) {
    livros[indice] = model({ ...livros[indice], ...body }, id); // vrerificando modelo
    ESCREVER_JSON('livros.json', livros); // sobreescrevendo json
    return { status: 200, message: 'Livro atualizado com sucesso' };
  }
  return { status: 404, message: 'Livro não encontrado' };
};

const destroy = (id) => {
  const indice = livros.findIndex((el) => el.id_livro === id); // procurando indice
  if (indice !== -1) {
    livros.splice(indice, 1); // apagando
    ESCREVER_JSON('livros.json', livros); // sobreescrevendo json
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