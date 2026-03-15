import { use, useState } from "react"
import { ScrollView, View, Text, Button, StyleSheet, useWindowDimensions } from "react-native"
import { Image } from "react-native"
import { globalStyles } from "../../../styles/globalStyles"

export function BannerTendencias({ noticias }) {
    const { width } = useWindowDimensions()

    return (
        <ScrollView horizontal style={styles.cont} centerContent={true}>
            {noticias.map((noticia, index) => (
                <View style={styles.card} key={index}>
                    <Text style={[styles.titular, globalStyles.titulo]}>{noticia.title}</Text>
                    <Image source={{ uri: noticia.urlToImage }} resizeMode="cover" width={width} height={300} />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "100%",
        height: 300,
        backgroundColor: "grey"
    },
    cont: {
        height: 300,
        width: "100%",
        marginBottom: 10
    },
    titular: {
        color: "white",
        fontSize: 20,
        position: "absolute",
        zIndex: 9999,
        bottom: 0,
        margin: 10
    }
})