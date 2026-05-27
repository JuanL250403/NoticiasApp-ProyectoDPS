import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Image } from "expo-image";
import { NoImagen } from "../../../components/NoImagen";

export function NoiticiaCard({ noticia, verDetalles }) {
    return (
        <TouchableOpacity onPress={() => verDetalles(noticia)} style={styles.card}>
            <View style={{height: 200}}>
                {noticia.urlToImage ? (

                    <Image
                        source={{ uri: noticia.urlToImage }}
                        style={styles.imagen}
                        contentFit="cover"
                    />

                ) : <NoImagen />}
            </View>

            <View style={styles.info}>

                <Text style={styles.source}>
                    {noticia.source?.name}
                </Text>

                <Text style={styles.title}>
                    {noticia.title}
                </Text>

                <Text style={styles.desc}>
                    {noticia.description}
                </Text>

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    titulo: {
        textAlign: "center",
        marginBottom: 20,
    },

    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        backgroundColor: "#F5F5F5",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
    },

    imagen: {
        width: "100%",
        height: 200,
    },

    info: {
        padding: 15,
    },

    source: {
        color: "gray",
        marginBottom: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },

    desc: {
        color: "#555",
    },
})