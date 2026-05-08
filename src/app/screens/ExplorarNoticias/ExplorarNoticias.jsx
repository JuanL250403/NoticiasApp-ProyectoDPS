import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "expo-image";

import { BarraBusqueda } from "../../components/BarraBusqueda";
import { Cargando } from "../../components/Cargando";

import { colores, globalStyles } from "../../styles/globalStyles";

export function ExplorarNoticias({ navigation, route }) {

  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // FILTROS
  const language = route?.params?.language || "es";
  const pais = route?.params?.pais || "us";
  const categoria = route?.params?.categoria || "";
  const fecha = route?.params?.fecha || "";

  async function obtenerNoticias() {

    setCargando(true);

    const key = process.env.EXPO_PUBLIC_API_KEY;

    try {

      let url =
        `https://newsapi.org/v2/top-headlines?country=${pais}&pageSize=10&apiKey=${key}`;

      if (categoria !== "") {
        url += `&category=${categoria}`;
      }

      const respuesta = await axios.get(url);

      setNoticias(respuesta.data.articles);

    } catch (e) {

      console.log(e);

    }

    setCargando(false);
  }

  useEffect(() => {
    obtenerNoticias();
  }, [language, pais, categoria, fecha]);

  if (cargando) {
    return <Cargando />;
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={[globalStyles.titulo, styles.titulo]}>
        Explorar Noticias
      </Text>

      {/* BUSQUEDA + FILTRO */}

      <View style={styles.top}>

        <BarraBusqueda />

        <TouchableOpacity
          style={styles.btnFiltro}
          onPress={() => navigation.navigate("filtros")}
        >

          <Text style={styles.txtFiltro}>
            Filtros
          </Text>

        </TouchableOpacity>

      </View>

      {/* NOTICIAS */}

      {noticias.map((noticia, index) => (

        <View key={index} style={styles.card}>

          {noticia.urlToImage ? (

            <Image
              source={{ uri: noticia.urlToImage }}
              style={styles.imagen}
              contentFit="cover"
            />

          ) : null}

          <View style={styles.info}>

            <Text style={styles.source}>
              {noticia.source?.name}
            </Text>

            <Text style={styles.title}>
              {noticia.title}
            </Text>

            <Text style={styles.desc}>
              {noticia.description}
            </Text>

          </View>

        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },

  titulo: {
    textAlign: "center",
    marginBottom: 20,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  btnFiltro: {
    backgroundColor: colores.Oscuro,
    padding: 12,
    borderRadius: 20,
    marginLeft: 10,
  },

  txtFiltro: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  imagen: {
    width: "100%",
    height: 200,
  },

  info: {
    padding: 15,
  },

  source: {
    color: "gray",
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  desc: {
    color: "#555",
  },

});