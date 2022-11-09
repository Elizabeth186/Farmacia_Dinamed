import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from "../db/imagendb";



const Agregar = (props) => {


  const [image, setImage] = useState(null);
  const [uploading, setuploading] = useState(false);

  const pickimage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect: [4,3],
      quality:1,
    });
    const source = {uri: result.uri};
    console.log(source);
    setImage(source);
  };


  const uploadImage = async () =>{
    setuploading(true);
    const Response = await fetch(image.uri)
    const blob = await Response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);


    try{
      await ref;

    } catch(e){
      console.log(e);
    }
    setuploading(false);
    Alert.alert(
      'imagen subida'
    );
    setImage(null);
  };


  const initalState = {
    nombre: "",
    descripcion: "",
    precio: "",
    img:""
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  const saveNewItem = async () => {
    if (state.nombre === "") {
      alert("Por favor ingrese nombre");
    } else {

      try {
        await db.db.collection("productos").add({
          nombre: state.nombre,
          descripcion: state.descripcion,
          precio: state.precio,
          img: state.img,
        });

        props.navigation.navigate("Home");
      } catch (error) {
        console.log(error)
      }
    }
  };

  

  

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.name}
        />
      </View>

      {/* description Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Descripcion"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.email}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Precio"
          onChangeText={(value) => handleChangeText(value, "precio")}
          value={state.precio}
        />
      </View>

      <TouchableOpacity onPress={pickimage}>
        <Text>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <View>
        {image && <Image source={{uri: image.uri}} style={{with: 200, height: 200}}/>}
      </View>
      <TouchableOpacity onPress={uploadImage}>
        <Text>Visualizar Imagen</Text>
      </TouchableOpacity>

      
      <View style={styles.button}>
        <Button title="Guardar" onPress={() => saveNewItem()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Agregar;