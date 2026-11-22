const API_URL = "http://192.168.100.15:3000/api";

// Função auxiliar: faz a requisição e já devolve o JSON
async function requisicao(caminho, opcoes) {
  const resposta = await fetch(API_URL + caminho, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || "Erro ao falar com o servidor.");
  }
  return dados;
}

export function listarDespesas() {
  return requisicao("/despesas");
}

export function buscarDespesa(id) {
  return requisicao("/despesas/" + id);
}

export function criarDespesa(plantacao) {
  return requisicao("/despesas", {
    method: "POST",
    body: JSON.stringify(plantacao),
  });
}

export function atualizarDespesa(id, plantacao) {
  return requisicao("/despesas/" + id, {
    method: "PUT",
    body: JSON.stringify(plantacao),
  });
}

export function removerDespesa(id) {
  return requisicao("/despesas/" + id, { method: "DELETE" });
}
