import React, { Component } from "react";
import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import axios from 'axios';

class Categorias extends Component {
    state = {
        listaGrupos: [],
        sinConexion: 0,
        nuevoGrupo: '', 
        loading: false, // Nuevo estado para indicar si la solicitud está en curso
    }

    componentDidMount() {
        this.fetchGrupos();
    }

    fetchGrupos = () => {
        axios.get("http://localhost:8000/listagrupos/")
            .then((response) => {
                this.setState({ listaGrupos: response.data });
            })
            .catch(function (error) {
                this.setState({ sinConexion: 1 });
            });
    }

    agregarGrupo = () => {
        // Indicar que la solicitud está en curso
        this.setState({ loading: true });

        // Enviar el nombre del nuevo grupo al backend
        axios.post("http://localhost:8000/nuevogrupo/", { grupo: this.state.nuevoGrupo })
            .then((response) => {
                // Actualizar la lista de grupos
                this.fetchGrupos();
                // Limpiar el campo de texto
                this.setState({ nuevoGrupo: '' });
            })
            .catch((error) => {
                console.error("Error al agregar grupo:", error);
            })
            .finally(() => {
                // Indicar que la solicitud ha terminado
                this.setState({ loading: false });
            });
    }

    borrarGrupo = (id) => {
        axios.delete(`http://localhost:8000/eliminargrupo/${id}/`)
            .then((response) => {
                // Actualizar la lista de grupos
                this.fetchGrupos();
            })
            .catch((error) => {
                console.error("Error al borrar grupo:", error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Categorias de Noticias</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del Grupo Nuevo"
                    value={this.state.nuevoGrupo}
                    onChangeText={(text) => this.setState({ nuevoGrupo: text })}
                />
                <Pressable style={styles.botones} onPress={this.agregarGrupo}>
                    {this.state.loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.textoboton}>Agregar Grupo</Text>
                    )}
                </Pressable>
                <ScrollView>
                    <FlatList
                        data={this.state.listaGrupos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View style={styles.linea}>
                                <Text style={styles.texto}>{item.grupo}</Text>
                                <Pressable style={styles.botones} onPress={() => this.borrarGrupo(item.id)}>
                                    <Text style={styles.textoboton}>Borrar</Text>
                                </Pressable>
                            </View>
                        }
                    />
                </ScrollView>
            </View>
        );
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
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
        width: 150,
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
        width: 120,
    },
    textoboton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
