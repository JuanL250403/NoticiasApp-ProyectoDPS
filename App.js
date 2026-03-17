import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Inicio } from "./src/app/screens/Inicio/Inicio";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { globalStyles, colores } from "./src/app/styles/globalStyles";
import "react-native-gesture-handler";
import { Configuracion } from "./src/app/screens/configuracion/configuracion";
import { Explorar } from "./src/app/screens/Explorar/Explorar";
import { Guardados } from "./src/app/screens/guardados/Guardados";

export default function App() {
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.BottomNavBar,
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={Inicio}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./assets/iconos/home.png")} // Ruta de tu imagen
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? colores.Oscuro : "white", // Cambia color si está enfocado
                }}
                resizeMode="contain"
              />
            ),
            tabBarLabelStyle: {
              color: "white",
            },
          }}
        />

        <Tab.Screen
          name="Explorar"
          component={Explorar}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./assets/iconos/explorar.png")} 
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? colores.Oscuro : "white",
                }}
                resizeMode="contain"
              />
            ),
            tabBarLabelStyle: {
              color: "white",
            },
          }}
        />

        <Tab.Screen
          name="Guardados"
          component={Guardados}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./assets/iconos/guardar.png")} // Ruta de tu imagen
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? colores.Oscuro : "white", // Cambia color si está enfocado
                }}
                resizeMode="contain"
              />
            ),
            tabBarLabelStyle: {
              color: "white",
            },
          }}
        />

        <Tab.Screen
          name="Configuración"
          component={Configuracion}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require("./assets/iconos/configuracion.png")} // Ruta de tu imagen
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? colores.Oscuro : "white", // Cambia color si está enfocado
                }}
                resizeMode="contain"
              />
            ),
            tabBarLabelStyle: {
              color: "white",
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  BottomNavBar: {
    backgroundColor: colores.MuyClaro,
  },
});
