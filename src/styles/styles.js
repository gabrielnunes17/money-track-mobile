// ESTILOS: todo o visual do aplicativo fica neste arquivo.
// As telas importam { styles } e usam, por exemplo, style={styles.card}.

import { StyleSheet } from "react-native";

// Paleta de cores (azul e laranja do Senac)
export const cores = {
  azul: "#004A8D",
  laranja: "#F7941D",
  fundo: "#F2F5F9",
  branco: "#FFFFFF",
  texto: "#1F2937",
  textoClaro: "#6B7280",
  borda: "#D5DCE6",
  vermelho: "#C62828",
};

export const styles = StyleSheet.create({
  // ---------- Geral ----------
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: 16,
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textoVazio: {
    textAlign: "center",
    color: cores.textoClaro,
    marginTop: 40,
  },

  // ---------- Botões ----------
  botao: {
    backgroundColor: cores.laranja,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  botaoTexto: {
    color: cores.branco,
    fontWeight: "bold",
    fontSize: 16,
  },
  botaoSecundario: {
    flex: 1,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.azul,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoSecundarioTexto: {
    color: cores.azul,
    fontWeight: "bold",
  },
  linha: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  // ---------- Card da plantação ----------
  card: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: cores.borda,
  },
  cardFoto: {
    width: "100%",
    height: 150,
  },
  cardCorpo: {
    padding: 12,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.azul,
  },
  cardSubtitulo: {
    color: cores.textoClaro,
    marginBottom: 10,
  },
  cardAcoes: {
    flexDirection: "row",
    gap: 10,
  },
  botaoExcluir: {
    flex: 1,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.vermelho,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoExcluirTexto: {
    color: cores.vermelho,
    fontWeight: "bold",
  },

  // ---------- Formulário ----------
  label: {
    fontWeight: "bold",
    color: cores.texto,
    marginBottom: 6,
  },
  input: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  previewFoto: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  textoLocalizacao: {
    color: cores.textoClaro,
    marginBottom: 12,
  },

  // ---------- Mapa ----------
  mapa: {
    flex: 1,
  },

  // ---------- IA ----------
  caixaIA: {
    backgroundColor: cores.fundo,
    borderLeftWidth: 4,
    borderLeftColor: cores.laranja,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  textoIA: {
    color: cores.texto,
    lineHeight: 22,
  },
});
