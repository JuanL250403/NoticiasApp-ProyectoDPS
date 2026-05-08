import { View, Text, StyleSheet, TouchableOpacity,TextInput,} from "react-native";

import { useState } from "react";

import { colores, globalStyles } from "../../styles/globalStyles";

export function FiltrosExploracion({ navigation }) {

  const [pais, setPais] = useState("us");
  const [categoria, setCategoria] = useState("");

  const categorias = [
    "business",
    "technology",
    "sports",
    "health",
    "science",
  ];

  function aplicarFiltros() {

    navigation.navigate("ExplorarHome", {
      pais,
      categoria,
    });

  }

  return (

    <View style={styles.container}>

      <Text style={[globalStyles.titulo, styles.titulo]}>
        Filtros
      </Text>

      <Text style={styles.label}>
        País
      </Text>

      <TextInput
        placeholder="us / mx / sv"
        value={pais}
        onChangeText={setPais}
        style={styles.input}
      />

      <Text style={styles.label}>
        Categoría
      </Text>

      <View style={styles.tags}>

        {categorias.map((cat, index) => (

          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              categoria === cat && styles.active
            ]}
            onPress={() => setCategoria(cat)}
          >

            <Text style={styles.tagText}>
              {cat}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={aplicarFiltros}
      >

        <Text style={styles.btnText}>
          Aplicar filtros
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },

  titulo: {
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    marginBottom: 10,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tag: {
    backgroundColor: "#f4b0a7",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },

  active: {
    backgroundColor: colores.Oscuro,
  },

  tagText: {
    color: "white",
  },

  btn: {
    backgroundColor: colores.Oscuro,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },

});