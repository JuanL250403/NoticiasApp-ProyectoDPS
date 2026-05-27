import { useState } from "react"
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native"

export function ModalPermisos() {
    const [visible, setVisible] = useState(false)

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >

            <View style={styles.overlay}>

                <View style={styles.modal}>

                    <Text style={styles.titulo}>
                        Permiso de ubicación
                    </Text>

                    <Text style={styles.descripcion}>
                        Esta aplicación necesita acceso a tu ubicación para mostrar noticias y recomendaciones cercanas.
                    </Text>

                    <View style={styles.botones}>

                        <TouchableOpacity style={styles.cancelar}>
                            <Text style={styles.textoCancelar}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.aceptar}>
                            <Text style={styles.textoAceptar}>
                                Permitir
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    modal: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 25
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e1e1e',
        marginBottom: 15
    },

    descripcion: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24
    },

    botones: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30
    },

    cancelar: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginRight: 10
    },

    textoCancelar: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600'
    },

    aceptar: {
        backgroundColor: '#E51E00',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 14
    },

    textoAceptar: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})