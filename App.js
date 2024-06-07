import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import ListaPost from './src/lista_post';
import Categorias from './src/categorias';
import CategoriaForm from './src/categoriaForm';
import LoginForm from './src/login';
import DetalleNoticia from './src/detalleNoticia';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PantallaInicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>
      <ListaPost navigation={navigation} />
      <View>
        <Pressable style={styles.botones} onPress={() => navigation.navigate('pcategorias')}>
          <Text style={styles.textoboton}>Ver Categorias</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const cerrarSesion = async (navigation) => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ navigation }) => ({
        title: 'Noticias c:',
        headerRight: () => (
          <Pressable onPress={() => cerrarSesion(navigation)} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </Pressable>
        ),
      })}>
        <Stack.Screen name="login" component={LoginForm} options={{ title: "Noticias c:", headerRight: null }} />
        <Stack.Screen name="inicio" component={PantallaInicio} />
        <Stack.Screen name="detalle" component={DetalleNoticia} />
        <Stack.Screen name="pcategorias" component={Categorias} />
        <Stack.Screen name="ncategorias" component={CategoriaForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botones: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  textoboton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  logoutButton: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
