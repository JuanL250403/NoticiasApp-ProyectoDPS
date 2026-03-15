import { View, Image, Text, StyleSheet, useWindowDimensions } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";


export function NoticiaCard({noticia}) {

    const {width} = useWindowDimensions()

    return (
        <View style={[{width: width * 0.65}, styles.card]}>
            <Image source={{uri: noticia.urlToImage}} width={width * 0.65} height={150} style={styles.imagen}/>
            <Text style={[globalStyles.subTitulo, styles.titulo]}>{noticia.title}</Text>
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
    titulo: {
        padding: 10
    },
    imagen: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})