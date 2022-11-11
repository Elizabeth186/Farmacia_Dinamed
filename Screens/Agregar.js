import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Dimensions
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from "../db/imagendb";
import db from '../db/firebasemeds';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Agregar = (props) => {

  const initalState = {
    nombre: "",
    marca: "",
    presentacion:"",
    descripcion: "",
    precio: "",
    img: ""
  };

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

  const [state, setState] = useState(initalState);

  const uploadImage = async () =>{
    
    setuploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);


    try{
      await ref;

    } catch(e){
      console.log(e);
    }
    setuploading(false);
    alert(
      'imagen subida'
    );
    setImage(null);
  };


  

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  const saveNewItem = async () => {

    

    if (state.nombre === "") {
      alert("Por favor ingrese nombre");
    } else if(state.marca === ""){
      alert("Por favor ingrese la marca");
    } else if(state.presentacion === ""){
      alert("Por favor ingrese presentacion del producto");
    } else if(state.descripcion === ""){
      alert("Por favor ingrese la descripcion");
    } else if(state.precio === ""){
      alert("Por favor ingrese el precio");
    
    }else{

      try {
        await db.db.collection("productos").add({
          nombre: state.nombre,
          marca: state.marca,
          presentacion: state.presentacion,
          descripcion: state.descripcion,
          precio: state.precio,
          img: state.img
         
        });

        props.navigation.navigate("Home");
      } catch (error) {
        console.log(error)
      }
    }
  };

  

  

  return (
    <ScrollView style={styles.container}>
  
  <Text style={styles.txt}>Nombre del producto</Text>
      <View style={styles.inputs}>
        
        <TextInput
          placeholder="Acetaminofen"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.name}
        />
      </View>
      <Text style={styles.txt}>Marca/Laboratio</Text>
      <View style={styles.inputs}>
        <TextInput
          placeholder="MK"
          onChangeText={(value) => handleChangeText(value, "marca")}
          value={state.marca}
        />
      </View>
      <Text style={styles.txt}>Presentacion del producto</Text>
      <View style={styles.inputspresentacion}>
        <TextInput
          placeholder="Tabletas 500mg x 100 Tb"
          onChangeText={(value) => handleChangeText(value, "presentacion")}
          value={state.presentacion}
        />
      </View>
      <Text style={styles.txt}>Descripcion del producto</Text>
      <View style={styles.inputsdescrip}>
        <TextInput
          placeholder="Alivia el dolor de cabeza, dolores provocados por catarro comun, gripe, vacunaciones, enfermedades virales, dolores de dientes, dolores de oidos y dolores de garganta."
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.descripcion}
        />
      </View>
      <View style={styles.inputsprecio}>
        <TextInput
          placeholder="$ 7.44"
          onChangeText={(value) => handleChangeText(value, "precio")}
          value={state.precio}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.txt}>Ingrese la Url de su imagen</Text>
      <View style={styles.inputspresentacion}>
        <TextInput
          placeholder="Tabletas 500mg x 100 Tb"
          onChangeText={(value) => handleChangeText(value, "img")}
          value={state.img}
        ></TextInput>
      </View>

      <TouchableOpacity  style={styles.btn} onPress={pickimage}>
        <Text style={styles.txtbtn} >Seleccione una imagen</Text>
      </TouchableOpacity>
      <Text style={styles.txtbtn2} >Subir imagen a la nube</Text>
      <TouchableOpacity style={styles.btn2} onPress={uploadImage}>
     
        <Image
             style={styles.tinyLogo}
             source={require('../assets/nube.png')}/>
      </TouchableOpacity>
      <View style={styles.btnview} >
        
    
        {image && <Image source={{uri: image.uri}} style={{with: 200, height: 200}}/>}
        
      </View>


      <View style={styles.button}>
      <TouchableOpacity style={styles.btnguardar} onPress={() => saveNewItem()}>
     
    <Text style={styles.txtbtnagregar}>Guardar</Text>
   </TouchableOpacity>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#DCE2F2',
    
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
  inputs: {
    color:'red',
   borderWidth:1,
   borderColor:'#368DD9',
   margin: 5,
   borderRadius:10,
   alignItems:'center',
   width: windowWidth/1.6,
   height: windowHeight/20,
   justifyContent: "center",
   alignSelf: 'center'
  },
  inputsdescrip: {

   borderWidth:1,
   borderColor:'#368DD9',
   margin: 5,
   borderRadius:10,
   height: windowHeight/5,
   textAlign: 'center',
   alignSelf: 'center'
  },
  inputsprecio: {
   borderWidth:1,
   borderColor:'#368DD9',
   margin: 5,
   borderRadius:10,
   height: windowHeight/18,
   alignItems:'center',
   width: windowWidth/4,
   justifyContent: "center",
   alignSelf: 'center'
  },
  inputspresentacion: {
    borderWidth:1,
    borderColor:'#368DD9',
    margin: 5,
    borderRadius:10,
    height: windowHeight/20,
    alignItems:'center',
    justifyContent: "center",
   
   
  },
  txt:{
    marginTop: 12,
    marginBottom: 2,
    textAlign:'center',
    color:'#082359',
    fontWeight: 'bold'
  },
  btnview:{
    marginTop: '5%',
    height: windowHeight/3.8,
   borderColor: '#616F8C',
   borderWidth: 1,
   marginBottom: "7%"
  },
  
  btn:{
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#616F8C',
    width: windowWidth/2,
    elevation: 12,
    borderColor: 'blue',
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems:'center',
    alignSelf: 'center'

  },
  
  txtbtn:{
    color:'white',

  },
  txtbtn2:{
    color:'#616F8C',
    fontSize: 10,
    textAlign:'center'

  },
  btn2:{
    marginTop: 5,
    marginBottom: 5,
    height: windowHeight/13,
    width: windowWidth/6,
    borderColor: 'blue',
    borderWidth: 0.5,
    borderRadius: 30,
    alignItems:'center',
    alignSelf: 'center',
    backgroundColor:'#DCE2F2',
    elevation: 7

  },
  tinyLogo:{
    width: windowWidth/12,
    height: windowHeight/23,
    alignSelf:'center',
    top:'20%'
  },
  button:{
    height: windowHeight/5,
    marginTop: 2
  }, 
  btnguardar:{
    marginTop: 20,
    height: windowHeight/15,
    backgroundColor:'white',
    borderColor: '#082359',
    borderWidth: 2,
    borderRadius: 10,
    alignItems:'center',
    justifyContent: "center",
    elevation: 10
  },
  txtbtnagregar:{
    textAlign:'center',
    color:'#082359',
    fontWeight: 'bold'
  }

});

export default Agregar;