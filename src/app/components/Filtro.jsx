import { View, Text, Image, StyleSheet } from "react-native";
import { colores } from "../styles/globalStyles";

export function Filtro() {
    return (
        <View style={styles.filtros}>
            <Image source={require("../../../assets/iconos/filtro.png")} style={styles.filtro} alt="busqueda" />
            <Text>Filtros</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    filtros: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colores.Gris,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    filtro: {
        margin: 5,
        width: 20,
        height: 20
    }
})