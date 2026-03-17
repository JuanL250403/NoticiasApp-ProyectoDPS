import { TextInput, StyleSheet, View, Text, Image } from "react-native";
import { colores } from "../styles/globalStyles";

export function BarraBusqueda() {
    return (
        <View style={styles.busqueda}>
            <Image source={require("../../../assets/iconos/explorar.png")} style={styles.lupa} alt="busqueda" />
            <TextInput placeholder="Buscar" style={styles.input}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    busqueda: {
        borderRadius: 30,
        backgroundColor: colores.Gris,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%'
    },
    input: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
    },
    lupa: {
        width: 30,
        height: 30,
        margin: 10
    }
})