import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Inicio } from "./src/app/screens/Inicio/Inicio";
import { Image } from "react-native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { globalStyles, colores } from "./src/app/styles/globalStyles";
import "react-native-gesture-handler";
import { Configuracion } from "./src/app/screens/configuracion/configuracion";
import { Explorar } from "./src/app/screens/Explorar/Explorar";
import { Guardados } from "./src/app/screens/guardados/Guardados";
import { FiltrosExploracion } from "./src/app/screens/FiltrosExploracion/FiltrosExploracion";
import { detalleArticulo } from "./src/app/screens/articulos/detalleArticulo";
import { Fuentes } from "./src/app/screens/Fuentes/Fuentes";
import { FiltrosFuentes } from "./src/app/screens/FiltrosFuentes/FiltrosFuentes";
import DetallesFuente from "./src/app/screens/detallesFuentes/DetallesFuente";
import { Seguidos } from "./src/app/screens/Seguidos/Seguidos";
import { ConfigProvider } from "./src/app/screens/Context/ConfigContext";
import { useEffect } from "react";

const Stack = createStackNavigator();

function ExplorarStack() {
  return (
    <Stack.Navigator initialRouteName="ExplorarHome">
      <Stack.Screen
        name="ExplorarHome"
        component={Explorar}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="filtros"
        component={FiltrosExploracion}
        options={{
          title: "Filtros",
        }}
      />
    </Stack.Navigator>
  );
}

function FuentesStack() {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen
        name="Lista"
        component={Fuentes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Filtros" component={FiltrosFuentes} />
      <Stack.Screen name="Detalles" component={DetallesFuente} />
    </Stack.Navigator>
  );
}


export default function App() {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const cargarDatos = async () => {
      await SecureStore.setItemAsync('apiToken', process.env.EXPO_PUBLIC_API_KEY)
    
    };

    cargarDatos()
  }, []);

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.BottomNavBar,
          headerShown: false,
        }}
        initialRouteName="Configuración"
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
          name="detalles"
          component={detalleArticulo}
          options={{
            tabBarItemStyle: { display: "none" },
          }}
        />

        <Tab.Screen
          name="Seguidos"
          component={Seguidos}
          options={{
            tabBarItemStyle: { display: "none" },
          }}
        />

        <Tab.Screen
          name="Fuentes"
          component={FuentesStack}
          options={{
            tabBarItemStyle: { display: "none" },
          }}
        />

        <Tab.Screen
          name="Explorar"
          component={ExplorarStack}
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
                  width: size + 5,
                  height: size + 5,
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
    <ConfigProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ConfigProvider>
  );
}

const styles = StyleSheet.create({
  BottomNavBar: {
    backgroundColor: colores.MuyClaro,
  },
});
