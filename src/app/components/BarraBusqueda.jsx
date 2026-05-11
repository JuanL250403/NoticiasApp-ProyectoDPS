import { TextInput, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { colores } from "../styles/globalStyles";
import { Recargar } from "./Recargar";

export function BarraBusqueda({ busqueda, setBusqueda, realizarBusqueda }) {

    return (

        <View style={styles.busqueda}>
            <TextInput
                placeholder="Buscar"
                style={styles.input}
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <TouchableOpacity onPress={() => realizarBusqueda()}>
                <Image
                    source={require("../../../assets/iconos/explorar.png")}
                    style={styles.lupa}
                />
            </TouchableOpacity>
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
        paddingLeft: 10,
    },

    lupa: {
        width: 30,
        height: 30,
        margin: 10
    }
})