import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colores } from "../../../styles/globalStyles";

export function Tag({ opcionActual, opcion, setOpcion }) {
    return (
        <TouchableOpacity
            style={[
                styles.tag,
                opcionActual === opcion && styles.active
            ]}
            onPress={() => setOpcion(opcion)}
        >

            <Text style={styles.tagText}>
                {opcion}
            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({



    tag: {
        backgroundColor: "#f4b0a7",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },

    active: {
        backgroundColor: colores.Oscuro,
    },

    tagText: {
        color: "white",
    },

});