import { TouchableHighlight, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { colores } from "../styles/globalStyles";
import { useState } from "react";
export function CheckBox({onPress, value}) {
    const [presionado, setPresionado] = useState(value ? true : false)

    const Presionado = () => {
        setPresionado(!presionado)
        onPress()
    }
    return (
        <TouchableOpacity style={[styles.caja, presionado ? {backgroundColor: colores.Opaco} : {backgroundColor: "white"}]} onPress={() => Presionado()}>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    caja: {
        margin: 10,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#D4D6DD',
        width: 30,
        height: 30,
    }
})