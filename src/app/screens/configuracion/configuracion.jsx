import { View, Text, ScrollView } from "react-native";
import { CheckBox } from "../../components/CheckBox";

export function Configuracion() {
    return (
        <ScrollView style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
                <Text>Configu</Text>
                <CheckBox />
            </View>
        </ScrollView>
    )
}