import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import { atualizarDespesa, buscarDespesa, criarDespesa } from "../services/api";
import { cores, styles } from "../styles/styles";

const categorias = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Compras",
  "Outros",
];

function converterDataApiParaLocal(valor) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})/.exec(valor ?? "");
  if (!partes) {
    return null;
  }

  const [, ano, mes, dia] = partes;
  const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
  if (
    data.getFullYear() !== Number(ano) ||
    data.getMonth() !== Number(mes) - 1 ||
    data.getDate() !== Number(dia)
  ) {
    return null;
  }

  return data;
}

export default function FormularioScreen({ navigation, route }) {
  const id = route?.params?.id;

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState(null);
  const [dataTemporaria, setDataTemporaria] = useState(new Date());
  const [seletorDataVisivel, setSeletorDataVisivel] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [carregando, setCarregando] = useState(Boolean(id));
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) {
      return undefined;
    }

    let ativo = true;

    async function carregarDespesa() {
      try {
        const despesa = await buscarDespesa(id);
        if (!ativo) {
          return;
        }

        setDescricao(despesa.descricao ?? "");
        setValor(despesa.valor == null ? "" : String(despesa.valor));
        setCategoria(despesa.categoria ?? "");
        setData(converterDataApiParaLocal(despesa.data));
        setObservacao(despesa.observacao ?? "");
      } catch (erro) {
        if (ativo) {
          Alert.alert("Erro", erro.message);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDespesa();

    return () => {
      ativo = false;
    };
  }, [id]);

  function abrirSeletorData() {
    const dataInicial = data ?? new Date();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: dataInicial,
        mode: "date",
        display: "default",
        onValueChange: (_event, dataSelecionada) => {
          if (dataSelecionada) {
            setData(dataSelecionada);
          }
        },
      });
      return;
    }

    setDataTemporaria(dataInicial);
    setSeletorDataVisivel(true);
  }

  async function salvar() {
    const descricaoLimpa = descricao.trim();
    const valorNumerico = Number(valor.replace(",", "."));

    if (!descricaoLimpa) {
      Alert.alert("Atenção", "Informe a descrição da despesa.");
      return;
    }

    if (!Number.isFinite(valorNumerico) || valorNumerico < 0.01) {
      Alert.alert("Atenção", "Informe um valor igual ou maior que 0,01.");
      return;
    }

    if (!categorias.includes(categoria)) {
      Alert.alert("Atenção", "Selecione uma categoria válida.");
      return;
    }

    if (!data || Number.isNaN(data.getTime())) {
      Alert.alert("Atenção", "Selecione uma data válida.");
      return;
    }

    const dataUtc = new Date(
      Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()),
    );
    const despesa = {
      descricao: descricaoLimpa,
      valor: valorNumerico,
      categoria,
      data: dataUtc.toISOString(),
      observacao: observacao.trim(),
    };

    try {
      setSalvando(true);
      if (id) {
        await atualizarDespesa(id, despesa);
      } else {
        await criarDespesa(despesa);
      }
      navigation?.goBack();
    } catch (erro) {
      Alert.alert("Erro", erro.message);
    } finally {
      setSalvando(false);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex.: Conta de energia"
          maxLength={200}
        />

        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={setValor}
          placeholder="Ex.: 125,50"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Categoria</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {categorias.map((opcao) => {
            const selecionada = categoria === opcao;
            return (
              <TouchableOpacity
                key={opcao}
                accessibilityRole="radio"
                accessibilityState={{ selected: selecionada }}
                style={[
                  styles.botaoSecundario,
                  {
                    flex: 0,
                    borderColor: selecionada ? cores.azul : cores.borda,
                    backgroundColor: selecionada ? cores.azul : cores.branco,
                  },
                ]}
                onPress={() => setCategoria(opcao)}
              >
                <Text
                  style={{
                    color: selecionada ? cores.branco : cores.azul,
                    fontWeight: "bold",
                  }}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Data</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={abrirSeletorData}
          style={[styles.input, { justifyContent: "center" }]}
        >
          <Text style={{ color: data ? cores.texto : cores.textoClaro }}>
            {data ? data.toLocaleDateString("pt-BR") : "Selecione uma data"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Observação (opcional)</Text>
        <TextInput
          style={[styles.input, { minHeight: 96, textAlignVertical: "top" }]}
          value={observacao}
          onChangeText={setObservacao}
          placeholder="Detalhes adicionais"
          multiline
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={salvar}
          disabled={salvando}
        >
          <Text style={styles.botaoTexto}>
            {salvando
              ? "Salvando..."
              : id
                ? "Salvar alterações"
                : "Salvar despesa"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={seletorDataVisivel}
        onRequestClose={() => setSeletorDataVisivel(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
          }}
        >
          <View
            style={{
              backgroundColor: cores.branco,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
              paddingBottom: 24,
            }}
          >
            <Text style={[styles.label, { fontSize: 18 }]}>Selecionar data</Text>
            <DateTimePicker
              value={dataTemporaria}
              mode="date"
              display="spinner"
              onValueChange={(_event, dataSelecionada) => {
                if (dataSelecionada) {
                  setDataTemporaria(dataSelecionada);
                }
              }}
            />
            <View style={styles.linha}>
              <TouchableOpacity
                style={styles.botaoSecundario}
                onPress={() => setSeletorDataVisivel(false)}
              >
                <Text style={styles.botaoSecundarioTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botaoSecundario, { backgroundColor: cores.azul }]}
                onPress={() => {
                  setData(dataTemporaria);
                  setSeletorDataVisivel(false);
                }}
              >
                <Text style={[styles.botaoSecundarioTexto, { color: cores.branco }]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
