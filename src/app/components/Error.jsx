import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { Recargar } from "./Recargar";
import { globalStyles } from "../styles/globalStyles";

export function Error({ recarga }) {
    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/iconos/errorCara.png")} style={styles.img}/>
            <Text style={globalStyles.titulo, styles.tituloError}>Al parecer ha ocurrido un error</Text>
            <Text style={globalStyles.subTitulo}>Revise su conexión a internet</Text>
            <TouchableOpacity onPress={() => recarga()}>
                <Recargar />
            </TouchableOpacity>
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
        fontSize: 22
    },
    img: {
        marginBottom: 50,
        height: 150,
        width: 150
    }
})