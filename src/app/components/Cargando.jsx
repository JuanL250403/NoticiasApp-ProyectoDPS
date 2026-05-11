import { Image, StyleSheet, View } from "react-native"

export function Cargando() {
    return (
        <View style={styles.contenedor}>
            <Image source={require("../../../assets/iconos/cargando.gif")} style={styles.cargando}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        alignItems: "center",
        justifyContent: "center"
    },
    cargando: {
        width: 60,
        height: 60,
        margin: 50
    }
})