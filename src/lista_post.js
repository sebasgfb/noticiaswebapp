import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, Pressable, Picker } from 'react-native';
import axios from 'axios';

class ListaPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaNoticias: [],
      listaGrupos: {},
      grupoSeleccionado: 'todos',
      sinConexion: false
    };
  }

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/listanoticias")
      .then(response => {
        this.setState({ listaNoticias: response.data });
      })
      .catch(error => {
        this.setState({ sinConexion: true });
      });

    axios.get("http://localhost:8000/listagrupos")
      .then(response => {
        const grupos = {};
        response.data.forEach(grupo => {
          grupos[grupo.id] = grupo.grupo;
        });
        this.setState({ listaGrupos: grupos });
      })
      .catch(error => {
        this.setState({ sinConexion: true });
      });
  }

  obtenerNombreGrupo = (grupoId) => {
    return this.state.listaGrupos[grupoId] || 'Grupo desconocido';
  }

  handleChangeGrupo = (grupoId) => {
    this.setState({ grupoSeleccionado: grupoId });
  }

  render() {
    const { listaNoticias, listaGrupos, grupoSeleccionado, sinConexion } = this.state;
    const { navigation } = this.props;

    if (sinConexion) {
      return <View style={styles.errorContainer}><Text>Error de conexión</Text></View>;
    }

    let filteredNoticias = listaNoticias;
    if (grupoSeleccionado !== 'todos') {
      filteredNoticias = listaNoticias.filter(item => {
        return item.grupo === parseInt(grupoSeleccionado);
      });
    }

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={grupoSeleccionado}
          style={styles.picker}
          onValueChange={(itemValue) => this.handleChangeGrupo(itemValue)}>
          <Picker.Item style={styles.titulo} label="Mostrar todos los grupos" value="todos" />
          {Object.keys(listaGrupos).map(grupoId => (
            <Picker.Item key={grupoId} label={listaGrupos[grupoId]} value={grupoId} />
          ))}
        </Picker>
        <FlatList
          data={filteredNoticias}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('detalle', { id: item.id })}>
              <View style={styles.tarjeta}>
                <Image style={styles.imagen} source={{ uri: item.imagen }} />
                <View style={styles.textoContainer}>
                  <Text style={styles.titulo}>{item.titulo}</Text>
                  <Text style={styles.contenido}>{this.obtenerNombreGrupo(item.grupo)}</Text>
                  <Text style={styles.fecha}>{this.formatDate(item.fecha)}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    );
  }
}

export default ListaPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 10,
  },
  imagen: {
    resizeMode: 'cover',
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  tarjeta: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textoContainer: {
    marginLeft: 10,
  },
  fecha: {
    fontSize: 13,
    color: 'gray',
    marginTop: 5,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
