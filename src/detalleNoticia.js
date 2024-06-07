import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';

const DetalleNoticia = ({ route }) => {
  const { id } = route.params;
  const [noticia, setNoticia] = useState(null);
  const [listaGrupos, setListaGrupos] = useState([]);

  const obtenerNombreGrupo = (grupoId) => {
    const grupo = listaGrupos.find((grupo) => grupo.id === grupoId);
    return grupo ? grupo.grupo : 'Grupo desconocido';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    // Realiza la solicitud para obtener los detalles de la noticia usando el ID
    axios
      .get(`http://localhost:8000/listanoticias/${id}`)
      .then((response) => {
        setNoticia(response.data);
      })
      .catch((error) => {
        console.error('Error fetching news details:', error);
      });

    // Realiza la solicitud para obtener la lista de grupos
    axios
      .get('http://localhost:8000/listagrupos')
      .then((response) => {
        setListaGrupos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  if (!noticia) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titulo}>{noticia.titulo}</Text>
        <Image style={styles.imagen} source={{ uri: noticia.imagen }} />
        <Text style={styles.fecha}>{formatDate(noticia.fecha)}</Text>
        <Text style={styles.grupo}>{obtenerNombreGrupo(noticia.grupo)}</Text>
        <Text style={styles.contenido}>{noticia.cuerpo}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
});

export default DetalleNoticia;
