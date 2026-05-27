import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Tag } from "../FiltrosExploracion/components/Tag";
import { useState, useEffect } from "react";
import { colores } from "../../styles/globalStyles";
import { globalStyles } from "../../styles/globalStyles";
import DateTimePicker from '@react-native-community/datetimepicker'


export function FiltrosFuentes({ navigation }) {

    const [lenguaje, setLenguaje] = useState("");
    const [categoria, setCategoria] = useState("");
    const [puedeFiltrar, setPuedeFiltrar] = useState(false)

    useEffect(() => {
        if (categoria && lenguaje) {
            setPuedeFiltrar(true)
        }
    }, [categoria, lenguaje])

    const categorias = [
        "general",
        "business",
        "technology",
        "sports",
        "health",
        "science",
    ];

    const lenguajes = [
        "ar",
        "de",
        "en",
        "es",
        "fr",
        "he",
        "it",
        "nl",
        "no",
        "pt",
        "ru",
        "sv",
        "ud",
        "zh",
        "us"
    ];

    function aplicarFiltros() {
        console.log(puedeFiltrar)
        if (!puedeFiltrar) {
            return
        }

        navigation.navigate("Lista", {
            categoria,
            lenguaje
        });
    }

    return (

        <View style={styles.container}>

            <Text style={[globalStyles.titulo, styles.titulo]}>
                Filtros
            </Text>



            <ScrollView>
                <Text style={styles.label}>
                    Categoría
                </Text>

                <View style={styles.tags}>

                    {categorias.map((cat, index) => (
                        <Tag key={index} opcionActual={categoria} opcion={cat} setOpcion={setCategoria} />
                    ))}

                </View>

                <Text style={styles.label}>
                    Lenguaje
                </Text>

                <View style={styles.tags}>

                    {lenguajes.map((len, index) => (
                        <Tag key={index} opcionActual={lenguaje} opcion={len} setOpcion={setLenguaje} />
                    ))}

                </View>


            </ScrollView>
            <TouchableOpacity
                style={puedeFiltrar ? styles.btn : styles.btnDes}
                onPress={aplicarFiltros}
            >

                <Text style={styles.btnText}>
                    Aplicar filtros
                </Text>

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },

    titulo: {
        textAlign: "center",
        marginBottom: 30,
    },

    label: {
        marginBottom: 10,
        fontWeight: "bold",
    },

    input: {
        backgroundColor: "#F2F2F2",
        borderRadius: 15,
        padding: 12,
        marginBottom: 20,
    },

    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

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

    btn: {
        backgroundColor: colores.Oscuro,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 30,
    },

    btnDes: {
        backgroundColor: colores.Gris,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 30,
    },

    btnText: {
        color: "white",
        fontWeight: "bold",
    },

});