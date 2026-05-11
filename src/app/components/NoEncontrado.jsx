import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { Recargar } from "./Recargar";
import { globalStyles } from "../styles/globalStyles";

export function NoEncontrado({ mensaje }) {
    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/iconos/noEncontrado.png")} style={styles.img}/>
            <Text style={globalStyles.titulo, styles.tituloError}>{mensaje}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    tituloError:{
        fontSize: 22,
        textAlign: "center"
    },
    img: {
        marginBottom: 50,
        height: 150,
        width: 150
    }
})