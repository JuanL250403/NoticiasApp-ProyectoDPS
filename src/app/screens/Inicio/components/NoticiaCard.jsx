import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";
import { Image } from "expo-image";

export function NoticiaCard({noticia}) {

    const {width} = useWindowDimensions()

    return (
        <View style={[{width: width * 0.65}, styles.card]}>
            {!noticia.urlToImage ?? 
                <Text>No disponible</Text>
            }
            <Image source={{uri: noticia.urlToImage}} width={width * 0.65} height={150} style={styles.imagen} alt="No disponible"/>
            <Text style={[globalStyles.subTitulo, {padding: 10}]}>{noticia.source.name}</Text>
            <Text style={[globalStyles.titulo, {padding: 10, marginBottom: 5}]}>{noticia.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        borderColor: 'red',
        margin: 10,
        justifyContent: "space-between",
        backgroundColor: "#F8F9FE"
    },
    imagen: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})