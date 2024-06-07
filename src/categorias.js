import React, {Component} from "react";
import { StyleSheet, Text, View, Image, Pressable, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function NavegarPagina({ pagina, mensaje }) {
    const navigation = useNavigation();
  
    return (
        <Pressable style={styles.botones2} onPress={() => navigation.navigate(pagina)}>
            <Text style={styles.textoboton} >{mensaje}</Text>
        </Pressable>
    );
}

class Categorias extends Component{
    state={
        listaGrupos: [],
        sinConexion: 0,
    }

    componentDidMount(){
        axios.get("http://localhost:8000/listagrupos")
        .then((response)=>{
            this.setState({listaGrupos:response.data})
        })
        .catch(function(error){
            this.setState({sinConexion:1});
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <h3>Categorias de Noticias</h3>
                <NavegarPagina pagina='ncategorias' mensaje='Nueva Categoria'/>
                <ScrollView>
                    <FlatList
                        data={this.state.listaGrupos}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> 
                            <View style={styles.linea}>
                                <Text style={styles.texto}>{item.grupo}</Text>
                                <Pressable style={styles.botones}>
                                    <Text style={styles.textoboton} >Editar</Text>
                                </Pressable>
                                <Pressable style={styles.botones}>
                                    <Text style={styles.textoboton} >Borrar</Text>
                                </Pressable>
                            </View>
                    }
                    />
                </ScrollView>
            </View>
        )
    }
}

export default Categorias;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    linea: {
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'left',
      borderBottomColor: 'red',
      borderBottomWidth: 2,
      marginBottom: 10,
      flexDirection: 'row',
    },
    texto: {
      fontSize: 20,
      width:150,
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
      width:50,
    },
    botones2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
    },
    textoboton: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
  