import React, {Component} from "react";
import { StyleSheet, Text, View, Image, Button, FlatList, ScrollView } from 'react-native';

function PantallaInicio({navigation}){
    return(
      <View style={styles.container}>
        <Image resizeMode='contain' style={styles.formatoimagen} source={{uri: 'https://www.guiltybit.com/wp-content/uploads/2019/08/Alucina-con-el-enfrentamiento-Perfect-Cell-vs-Son-Gohan-SSJ2-en-Dragon-Ball-Z-KAKAROT.jpg'}} ></Image>
        <Text style={styles.titulo} >Noticias c:</Text>
        <ListaPost/>
        <View>
          <Pressable style={styles.botones} onPress={()=> navigation.navigate('pcategorias') }>
            <Text style={styles.textoboton} >Ver Categorias</Text>
          </Pressable>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formatoimagen: {
      width: 200,
      height: 200,
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
  });
  
  
export default PantallaInicio;