import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { listarDespesas, removerDespesa } from "../services/api";
import { cores, styles } from "../styles/styles";

function formatarData(data) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})/.exec(
    typeof data === "string" ? data : "",
  );
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]}` : "";
}

export default function ListaScreen({ navigation }) {
  const [despesas, setDespesas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const telaVisivel = useIsFocused();

  async function carregar() {
    try {
      const dados = await listarDespesas();
      setDespesas(dados);
    } catch (erro) {
      Alert.alert("Erro", erro.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (telaVisivel) {
      carregar();
    }
  }, [telaVisivel]);

  function confirmarExclusao(despesa) {
    Alert.alert("Excluir", `Deseja excluir "${despesa.descricao}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => excluir(despesa._id),
      },
    ]);
  }

  async function excluir(id) {
    try {
      await removerDespesa(id);
      carregar();
    } catch (erro) {
      Alert.alert("Erro", erro.message);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.azul} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("Formulario")}
      >
        <Text style={styles.botaoTexto}>+ Nova Despesa</Text>
      </TouchableOpacity>

      <FlatList
        data={despesas}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhuma despesa cadastrada.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardCorpo}>
              <Text style={styles.cardTitulo}>{item.descricao}</Text>
              <Text style={styles.cardSubtitulo}>{item.valor}</Text>
              <Text style={styles.cardSubtitulo}>{item.categoria}</Text>
              <Text style={styles.cardSubtitulo}>{formatarData(item.data)}</Text>
              <Text style={styles.cardSubtitulo}>{item.observacao}</Text>

              <View style={styles.cardAcoes}>
                <TouchableOpacity
                  style={styles.botaoSecundario}
                  onPress={() =>
                    navigation.navigate("Formulario", { id: item._id })
                  }
                >
                  <Text style={styles.botaoSecundarioTexto}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => confirmarExclusao(item)}
                >
                  <Text style={styles.botaoExcluirTexto}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
