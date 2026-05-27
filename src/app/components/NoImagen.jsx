import { View, Text, Image, StyleSheet } from "react-native";
import { colores } from "../styles/globalStyles";

export function NoImagen() {
    return (
        <View style={[styles.container]}>
            <Image source={require("../../../assets/iconos/noImagen.png")} style={[styles.img]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff816e",
    },
    tituloError: {
        fontSize: 22,
        textAlign: "center"
    },
    img: {
        height: 50,
        width: 50
    }
})