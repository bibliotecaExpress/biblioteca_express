const { GERAR_ID } = require("../../src/id.js");
const { LER_JSON, ESCREVER_JSON } = require("../../src/json-utils.js");

// Carrega os leitores do arquivo
const leitores = LER_JSON('leitores.json');

const modelLeitor = (body, id = GERAR_ID()) => ({
  id_leitor: id,
  biblioteca_livros: [],
  status: body.status || "pretendo ler", // Define um status padrão
  historico_leitor: []
});

// Funções CRUD

const indexLeitores = () => leitores;

const showLeitor = (id) => leitores.find((el) => el.id_leitor === id) || null;

const createLeitor = (body) => {
  const novoLeitor = modelLeitor(body);
  leitores.push(novoLeitor);
  ESCREVER_JSON('leitores.json', leitores);
  return { status: 201, message: 'Leitor criado com sucesso' };
};

const updateLeitor = (body, id) => {
  const indice = leitores.findIndex((el) => el.id_leitor === id);
  if (indice !== -1) {
    leitores[indice] = { ...leitores[indice], ...body };
    ESCREVER_JSON('leitores.json', leitores);
    return { status: 200, message: 'Leitor atualizado com sucesso' };
  }
  return { status: 404, message: 'Leitor não encontrado' };
};

const deleteLeitor = (id) => {
  const indice = leitores.findIndex((el) => el.id_leitor === id);
  if (indice !== -1) {
    leitores.splice(indice, 1);
    ESCREVER_JSON('leitores.json', leitores);
    return { status: 204, message: 'Leitor removido com sucesso' };
  }
  return { status: 404, message: 'Leitor não encontrado' };
};

const addLivroBiblioteca = (idLeitor, idLivro, status) => {
    const leitor = showLeitor(idLeitor);
  
    if (!leitor) {
      return { status: 404, message: 'Leitor não encontrado' };
    }
  
    const livroExistente = leitor.biblioteca_livros.find(livro => livro.id_livro === idLivro);
    if (livroExistente) {
      return { status: 409, message: 'Livro já está na biblioteca' };
    }
  
    leitor.biblioteca_livros.push({ id_livro, status });
    ESCREVER_JSON('leitores.json', leitores);
    return { status: 200, message: 'Livro adicionado à biblioteca com sucesso' };
  };
  
const removeLivroBiblioteca = (idLeitor, idLivro) => {
  const leitor = showLeitor(idLeitor);

  if (!leitor) {
    return { status: 404, message: 'Leitor não encontrado' };
  }

  const indice = leitor.biblioteca_livros.findIndex(livro => livro.id_livro === idLivro);
  if (indice === -1) {
    return { status: 404, message: 'Livro não encontrado na biblioteca' };
  }

  const livroRemovido = leitor.biblioteca_livros.splice(indice, 1)[0];
  leitor.historico_leitor.push(livroRemovido);
  ESCREVER_JSON('leitores.json', leitores);
  return { status: 200, message: 'Livro removido da biblioteca e adicionado ao histórico' };
};

module.exports = {
  createLeitor,
  indexLeitores,
  showLeitor,
  updateLeitor,
  deleteLeitor,
  addLivroBiblioteca,
  removeLivroBiblioteca
};