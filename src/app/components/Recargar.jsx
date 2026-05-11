import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { colores } from "../styles/globalStyles";

export function Recargar() {
    return(
        <View style={styles.reacarga}>
            <Image source={require("../../../assets/iconos/recargar.png")} style={styles.img}/>
        </View>
    )
}

const styles = StyleSheet.create({
    reacarga: {
        backgroundColor: colores.Medio,
        borderRadius: 999,
        padding: 15,
        margin: 10
    },
    img:{
        height: 40,
        width: 40
    }
})