import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Comentarios = ({ noticiaId }) => {
  const [comentariosVisibles, setComentariosVisibles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sinConexion, setSinConexion] = useState(false);

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
      .get('http://localhost:8000/listacomentarios/')
      .then((response) => {
        const comentarios = response.data.filter((comentario) => comentario.noticia === noticiaId && comentario.visible);
        setComentariosVisibles(comentarios);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setLoading(false);
        setSinConexion(true);
      });

    axios
      .get('http://localhost:8000/listausuarios/')
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setSinConexion(true);
      });
  }, [noticiaId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (sinConexion) {
    return <View style={styles.errorContainer}><Text>Error de conexión, actualice la página en un momento.</Text></View>;
  }

  return (
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

export default Comentarios;
