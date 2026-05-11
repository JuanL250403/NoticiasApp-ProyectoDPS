import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

export function Paginacion({ pagina, setPagina, limite }) {
    const atras = () => {
        if (pagina === 1) {
            return
        }
        setPagina(pagina - 1)
    }

    const adelante = () => {
        if (pagina === limite || limite === 0) {
            return
        }
        setPagina(pagina + 1)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => atras()}>
                <Image style={styles.atras} source={require("../../../assets/iconos/paginacionAccion.png")} />
            </TouchableOpacity>
            <Text>{pagina}/{limite}</Text>
            <TouchableOpacity onPress={() => adelante()}>
                <Image style={styles.adelante} source={require("../../../assets/iconos/paginacionAccion.png")} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        flexDirection: "row"
    },
    adelante: {
        height: 30,
        width: 30
    },
    atras: {
        height: 30,
        width: 30,
        transform: [{
            rotate: "180deg"
        }]
    }
})