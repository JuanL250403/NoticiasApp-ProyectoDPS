import { View, Text, ScrollView, useWindowDimensions, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { colores, globalStyles } from "../../styles/globalStyles";
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import { ModalPermisos } from "./components/Modal";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Linking } from "react-native";
import { useConfig } from "../Context/ConfigContext";

export function Configuracion() {
    const { idioma, fuente, guardarIdioma, removerIdioma, guardarFuente  } = useConfig()

    const [autorizadoGeo, setAutorizadoGeo] = useState(false)

    const usarGeo = async () => {

        const { status } = Location.getForegroundPermissionsAsync()

        if (status !== 'granted') {

            const request = await Location.requestForegroundPermissionsAsync()

            if (request.status !== 'granted') {
                return
            }

        } 

        setAutorizadoGeo(true)
        const actual = await Location.getCurrentPositionAsync({})

        const local = Localization.getLocales()

        if (local && local.length > 0) {
            guardarIdioma(local[0].languageCode);
        }
    }

    const openSettings = () => {
        Linking.openSettings()
    };

    const cambiarEstado = () => {
        if (autorizadoGeo) {
            openSettings()
        } else {
            usarGeo()
        }
    }

    useEffect(() => {
        const confirmarGeo = async () => {
            const { status } = await Location.getForegroundPermissionsAsync()
            if (status === 'granted') {
                setAutorizadoGeo(true)
            } else {
                setAutorizadoGeo(false)
            }
        }
        confirmarGeo()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ModalPermisos />
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
                contentContainerStyle={{
                    paddingVertical: 20,
                    alignItems: 'center'
                }}
                showsVerticalScrollIndicator={false}
            >

                <View style={[styles.opcion,]}>
                    <View style={{ width: '80%' }}>
                        <Text style={globalStyles.titulo}>Modo oscuro</Text>

                        <Text style={styles.descripcion}>
                            Oscurece la apariencia de la aplicación para tu comodidad
                        </Text>
                    </View>


                </View>

                <View style={[styles.opcion]}>
                    <View style={{ width: '70%' }}>
                        <Text style={globalStyles.titulo}>Tamaño de fuente</Text>

                        <Text style={styles.descripcion}>
                            Tamaño de letra que tendrá el contenido de los artículos
                        </Text>
                    </View>

                    <View style={styles.burbuja}>
                        <TextInput keyboardType="numeric" style={styles.burbujaTexto} value={fuente} onChangeText={guardarFuente} maxLength={2}></TextInput>
                    </View>
                </View>


                <View style={[styles.opcion]}>
                    <View style={{ width: '70%' }}>
                        <Text style={globalStyles.titulo}>Idioma de artículos</Text>

                        <Text style={styles.descripcion}>
                            Define un idioma predeterminado para la búsqueda y recomendación de artículos
                        </Text>
                    </View>

                    <View style={styles.burbuja}>
                        <Text style={styles.burbujaTexto}>{idioma ?? 'ninguno'}</Text>
                    </View>
                </View>

                <TouchableOpacity style={[styles.opcion]} onPress={() => cambiarEstado()}>
                    <View style={{ width: '80%' }}>
                        <Text style={globalStyles.titulo}>Geolocalización</Text>

                        <Text style={styles.descripcion}>
                            Permite acceder a tu ubicación actual para poder detectar tu idioma
                        </Text>

                        <Text style={styles.descripcion}>
                            {autorizadoGeo ? 'Permitido' : 'No permitida'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}
const styles = StyleSheet.create({
    check: {

        margin: 10,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#D4D6DD',
        width: 30,
        height: 30,

    },
    opcion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "90%",
        backgroundColor: 'white',

        marginVertical: 10,
        paddingVertical: 22,
        paddingHorizontal: 18,

        borderRadius: 24,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,

        elevation: 4
    },

    descripcion: {
        marginTop: 8,
        fontSize: 15,
        lineHeight: 24,
        color: '#707070'
    },

    burbuja: {
        borderRadius: 9999,
        backgroundColor: colores.Oscuro,

        width: 80,
        height: 48,

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.18,
        shadowRadius: 4,

        elevation: 5
    },
    burbujaTexto: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})