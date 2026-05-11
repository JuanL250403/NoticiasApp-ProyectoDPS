import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { colores, globalStyles } from "../../styles/globalStyles";
import { Tag } from "./components/Tag";
import DateTimePicker from '@react-native-community/datetimepicker'
export function FiltrosExploracion({ navigation }) {

  const [lenguaje, setLenguaje] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaDesde, setFechaDesde] = useState(null)
  const [fechaHasta, setFechaHasta] = useState(null)
  const [elegirFechaDesde, setElegirFechaDesde] = useState(false)
  const [elegirFechaHasta, setElegirFechaHasta] = useState(false)
  const [puedeFiltrar, setPuedeFiltrar] = useState(false)
  useEffect(() => {
    if (categoria && fechaDesde && fechaHasta && lenguaje) {
      setPuedeFiltrar(true)
    }
  }, [categoria, fechaDesde, fechaHasta, lenguaje])

  const categorias = [
    "business",
    "technology",
    "sports",
    "health",
    "science",
  ];

  const lenguajes = [
    "ar",
    "de",
    "en",
    "es",
    "fr",
    "he",
    "it",
    "nl",
    "no",
    "pt",
    "ru",
    "sv",
    "ud",
    "zh",
    "us"
  ];

  function aplicarFiltros() {
    if (!puedeFiltrar) {
      return
    }
    navigation.navigate("ExplorarHome", {
      lenguaje,
      categoria,
      fechaDesde,
      fechaHasta
    });
  }

  const handlerFechaDesde = (date) => {
    setFechaDesde(date)
    setElegirFechaDesde(false)
    console.log(fechaDesde)
  }

  const handlerFechaHasta = (date) => {
    setFechaHasta(date)
    setElegirFechaHasta(false)
    console.log(fechaHasta)
  }

  return (

    <View style={styles.container}>

      {
        elegirFechaDesde ?
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => handlerFechaDesde(date)}
          />
          :
          <></>
      }

      {elegirFechaHasta ?
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handlerFechaHasta(date)}
        />
        :
        <></>
      }

      <Text style={[globalStyles.titulo, styles.titulo]}>
        Filtros
      </Text>



      <ScrollView>
        <Text style={styles.label}>
          Categoría
        </Text>

        <View style={styles.tags}>

          {categorias.map((cat, index) => (
            <Tag key={index} opcionActual={categoria} opcion={cat} setOpcion={setCategoria} />
          ))}

        </View>

        <Text style={styles.label}>
          Lenguaje
        </Text>

        <View style={styles.tags}>

          {lenguajes.map((len, index) => (
            <Tag key={index} opcionActual={lenguaje} opcion={len} setOpcion={setLenguaje} />
          ))}

        </View>

        <Text style={styles.label}>
          Fecha
        </Text>

        <View>
          <Text>Desde</Text>
          <TouchableOpacity style={styles.input} onPress={() => setElegirFechaDesde(true)}>
            <Text>{fechaDesde?.toDateString() || "mm/dd/yyyy"}</Text>
          </TouchableOpacity>
          <Text>Hasta</Text>
          <TouchableOpacity style={styles.input} onPress={() => setElegirFechaHasta(true)} >
            <Text>{fechaHasta?.toDateString() || "mm/dd/yyyy"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={puedeFiltrar ? styles.btn : styles.btnDes}
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

  btnDes: {
    backgroundColor: colores.Gris,
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