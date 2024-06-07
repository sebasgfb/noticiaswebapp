import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Pressable, FlatList, ScrollView, TextInput } from 'react-native';
import { Formik } from "formik";
import axios from "axios";

class CategoriaForm extends Component{
    state={
        listaGrupos: [],
        
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
    }

    render(){
        return(
            <Formik
                initialValues={{ grupo: "",
                                 otros: "123",
                }}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ handleChange, handleSubmit, values }) => (
                <>
                    <TextInput style={styles.textBox} value={values.grupo} type="text" placeholder="Ingrese una nueva Categoría" onChangeText={handleChange("grupo")} />
                    <TextInput style={styles.textBox} value={values.otros} type="text" placeholder="Ingreseotro valor" onChangeText={handleChange("otros")} />
                    <Pressable style={styles.botones} onPress={handleSubmit}>
                        <Text style={styles.textoboton} >Grabar</Text>
                    </Pressable>
                </>
                )}
            </Formik>
        )
    }


}

export default CategoriaForm;

const styles = StyleSheet.create({
    textBox: {
        marginTop: 10,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginRight: 20,
        marginLeft: 20,
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