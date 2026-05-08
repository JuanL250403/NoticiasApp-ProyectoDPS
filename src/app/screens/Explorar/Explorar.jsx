import { StyleSheet, View } from "react-native";
import { BarraBusqueda } from "../../components/BarraBusqueda";
import { Filtro } from "../../components/Filtro";

export function Explorar() {
    return (
        <View style={{backgroundColor: 'white'}} >
            <View style={styles.busqueda}>
                <BarraBusqueda></BarraBusqueda>
                <Filtro></Filtro>
            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    busqueda: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})