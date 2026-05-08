import { View, Text, ScrollView, useWindowDimensions, StyleSheet } from "react-native";
import { CheckBox } from "../../components/CheckBox";
import { colores, globalStyles } from "../../styles/globalStyles";

export function Configuracion() {
    const { width } = useWindowDimensions()


    return (
        <ScrollView style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={[styles.opcion, { width: width * 0.95 }]}>
                <View style={{width: '80%'}}>
                    <Text style={globalStyles.titulo}>Modo oscuro</Text>
                    <Text style={[globalStyles.subTitulo]}>Oscurece la apariencia de la aplicación para tu comodidad</Text>
                </View>
                <CheckBox />
            </View>
            <View style={[styles.opcion, { width: width * 0.95 }]}>
                <View style={{width: '80%'}}>
                    <Text style={globalStyles.titulo}>Idioma de articulos</Text>
                    <Text style={[globalStyles.subTitulo]}>Define un idioma predeterminado para la busqueda y recomendacion de artículos</Text>
                </View>
                <View style={styles.burbuja}>
                    <Text style={[globalStyles.titulo, { color: 'white' }]}>es</Text>
                </View>
            </View>
            <View style={[styles.opcion, { width: width * 0.95 }]}>
                <View style={{width: '80%'}}>
                    <Text style={globalStyles.titulo}>Geolocalización</Text>
                    <Text style={[globalStyles.subTitulo]}>Permite acceder a tu ubicación actual y personalizar tus busquedas y recomendaciones</Text>
                </View>
                <CheckBox />
            </View>
            <View style={[styles.opcion, { width: width * 0.95}]}>
                <View style={{width: '80%'}}>
                    <Text style={globalStyles.titulo}>Tamaño de fuente</Text>
                    <Text style={[globalStyles.subTitulo]}>Tamaño de letra que tendra el contenido de los articulos</Text>
                </View>
                <View style={styles.burbuja}>
                    <Text style={[globalStyles.titulo, { color: 'white' }]}>12</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    opcion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#bdbdbd'
    },
    burbuja: {
        borderRadius: 9999,
        backgroundColor: colores.Oscuro,
        width: 30,
        height: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    }
})