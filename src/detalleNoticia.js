import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, FlatList, Pressable } from 'react-native';
import axios from 'axios';

const DetalleNoticia = ({ route }) => {
  const { id } = route.params;
  const [noticia, setNoticia] = useState(null);
  const [listaGrupos, setListaGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comentariosVisibles, setComentariosVisibles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [sinConexion, setSinConexion] = useState(false);

  const obtenerNombreGrupo = (grupoId) => {
    const grupo = listaGrupos.find((grupo) => grupo.id === grupoId);
    return grupo ? grupo.grupo : 'Grupo desconocido';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const obtenerNombreAutor = (autorId) => {
    const autor = usuarios.find((usuario) => usuario.id === autorId);
    return autor ? autor.nombre : 'Autor desconocido';
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/listanoticias/${id}`)
      .then((response) => {
        setNoticia(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching news details:', error);
        setLoading(false); 
        setSinConexion(true);
      });

    axios
      .get('http://localhost:8000/listagrupos')
      .then((response) => {
        setListaGrupos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        setSinConexion(true);
      });

    axios
      .get('http://localhost:8000/listacomentarios')
      .then((response) => {
        const comentarios = response.data.filter((comentario) => comentario.noticia === id && comentario.visible);
        setComentariosVisibles(comentarios);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setSinConexion(true);
      });

    axios
      .get('http://localhost:8000/listausuarios')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setSinConexion(true);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (sinConexion) {
    return <View style={styles.errorContainer}><Text>Error de conexión</Text></View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titulo}>{noticia.titulo}</Text>
        <Image style={styles.imagen} source={{ uri: noticia.imagen }} />
        <Text style={styles.fecha}>{formatDate(noticia.fecha)}</Text>
        <Text style={styles.grupo}>{obtenerNombreGrupo(noticia.grupo)}</Text>
        <Text style={styles.contenido}>{noticia.cuerpo}</Text>
        <Text style={styles.subtitulo}>Comentarios</Text>
        <FlatList
          data={comentariosVisibles}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <View style={styles.textoContainer}>
                <Text style={styles.autor}>{obtenerNombreAutor(item.autor)} - {formatDate(item.fecha)}</Text>
                <Text style={styles.comentario}>{item.cuerpo}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  fecha: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  grupo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contenido: {
    fontSize: 18,
    lineHeight: 24,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  tarjeta: {
    margin: 8,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
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
  autor: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  comentario: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default DetalleNoticia;
