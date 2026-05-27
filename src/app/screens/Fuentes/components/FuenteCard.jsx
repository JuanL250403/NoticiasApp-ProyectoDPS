import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colores } from "../../../styles/globalStyles";

export function FuenteCard({ fuente, verDetalles }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => verDetalles(fuente)}>
            <Text style={styles.titulo}>{fuente.name}</Text>
            <Text style={styles.categoria}>{fuente.category}</Text>
            <View style={styles.detalles}>
                <Text style={styles.extras}>Lenguaje: {fuente.language}</Text>
                <Text style={styles.extras}>País: {fuente.country}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e6e6e6",
        margin: 10,
        padding: 20,
        borderRadius: 20
    },
    categoria: {
        fontSize: 25
    },
    detalles: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    extras: {
        fontSize: 18,
        color: "#a0a0a0"
    },
    titulo: {
        color: colores.Claro,
        fontSize: 32
    }
})