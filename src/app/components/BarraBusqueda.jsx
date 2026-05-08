import { TextInput, StyleSheet, View, Image } from "react-native";
import { colores } from "../styles/globalStyles";

export function BarraBusqueda({ busqueda, setBusqueda }) {

    return (

        <View style={styles.busqueda}>

            <Image
                source={require("../../../assets/iconos/explorar.png")}
                style={styles.lupa}
            />

            <TextInput
                placeholder="Buscar"
                style={styles.input}
                value={busqueda}
                onChangeText={setBusqueda}
            />

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
        flex: 1,
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