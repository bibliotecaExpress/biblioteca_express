// json-utils.js
const fs = require('fs');

function LER_JSON(arquivo) {
  try {
    const dados = fs.readFileSync(arquivo, 'utf8');
    return JSON.parse(dados);
  } catch (err) {
    console.error(err);
    return [];
  }
}

function ESCREVER_JSON(arquivo, dados) {
  fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
}

module.exports = {
  LER_JSON,
  ESCREVER_JSON
};