import { StyleSheet } from "react-native";

const Monserrat = require("../../../assets/fonts/Montserrat-VariableFont_wght.ttf");
export const colores = StyleSheet.create({
  Oscuro: "#400800",
  Opaco: "#7F1100",
  Medio: "#BF1900",
  Claro: "#E51E00",
  MuyClaro: "#E51E00",
  Gris: "#dbdbdb"
});

export const globalStyles = StyleSheet.create({
  titulo: {
    fontFamily: Monserrat,
    fontWeight: "600",
  },
  subTitulo: {
    fontFamily: Monserrat,
    fontWeight: "300",
  },
  redirecciones: {
    color: colores.Oscuro,
    fontFamily: Monserrat,
    fontWeight: "500",
  },
  botonClaro: {
    textAlign: "center",
    padding: 10,
    fontFamily: Monserrat,
    borderRadius: 20,
    backgroundColor: colores.MuyClaro,
    color: "white",
  },
    botonOscuro: {
    textAlign: "center",
    padding: 10,
    fontFamily: Monserrat,
    borderRadius: 20,
    backgroundColor: colores.Oscuro,
    color: "white",
  }
});
