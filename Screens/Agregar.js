import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Clipboard
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {firebase} from "../db/imagendb";
import db from '../db/firebasemeds';
import { validandoprice, valiprecio } from "../validaciones/validacion";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Agregar = (props) => {
  
  //agregando los items
  const initalState = {
    nombre: "",
    marca: "",
    presentacion:"",
    descripcion: "",
    precio: "",
    img: "",
  };

  

  //hooks para el manejo de imagen 
  const [image, setImage] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [state, setState] = useState(initalState);

  //abrir galeria y seleccionar imagen, obtiendo uri
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
  
const [url, seturl] = useState('');
  //funcion para subir imagen a storage
  const uploadImage = async () =>{
    setuploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
     const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    ref.on("jaja", function(){
      ref.snapshot.ref.getDownloadURL().then(function (urlimage){

        console.log(urlimage)
      })
    })


    try{
      await ref;
     setuploading(ref)
    } catch(e){
      console.log(e);
    }
    setuploading(false);
    alert(
      'imagen subida'
    );
   
    setImage(source);
  };

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  //Guardar un nuevo item
  const saveNewItem = async () => {
  //validaciones
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
    }else if(!validandoprice(state.precio)){
      alert("Precio debe contener al menos 1 entero(Maximo 4) y dos decimales")
    }else if(state.img == ""){
     alert("El producto no contiene el url de la imagen")
    }else{
      try {
        //Llamando a la coleccion Productos
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
  // const copyToClipboardurl = () => {
  //   Clipboard.setString(ref && urlimage)
  //   alert('Enlace copiado!!')
  // }

  // const copyToClipboard = () => {
  //   Clipboard.setString(image && image.uri)
  //   alert('Enlace copiado!!')
  // }
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.txt}>Nombre del producto</Text>
    <View style={styles.inputs}>
        <TextInput
          placeholder="Acetaminofen"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.name}/>
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
      <View style={styles.inputs}>
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
      <View style={styles.inputs}>
        <TextInput
          placeholder="URL"
          onChangeText={(value) => handleChangeText(value, "img")}
          value={state.img}
        ></TextInput>
      </View>
     
      <Text style={styles.txtbtn2} >Subir imagen a la nube</Text>
      <TouchableOpacity style={styles.btn2} onPress={uploadImage}>
        <Image
             style={styles.tinyLogo}
             source={require('../assets/nube.png')}/>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.clipt} onPress={() => copyToClipboardurl()}>
          <Text style={styles.cliptext}>jajja</Text>
        </TouchableOpacity> */}

      <Text style={styles.txtbtn} >Seleccione una imagen</Text>
      <View style={styles.btnview} >
        <TouchableOpacity  style={styles.btnview} onPress={pickimage}>
        <View>
        {image && <Image source={{uri: image.uri}} style={{with: windowWidth/3, height: windowHeight/4}}/>}
        </View>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.clipt} onPress={() => copyToClipboard()}>
          <Text style={styles.cliptext}>{image && image.uri}</Text>
        </TouchableOpacity> */}
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
  clipt:{
   width: windowWidth/1.1,
   height: windowHeight/25,
   backgroundColor: '#DCE2F2',
   alignSelf:'center',
   borderRadius: 25,
   borderColor: 'white',
   borderWidth: 2,
   elevation: 12,
   justifyContent:'center'
  },
  cliptext:{
color: 'gray',
fontSize: 10,
textAlign:'center',
fontWeight: 'bold'
  },
  inputs: {
    color:'red',
   borderWidth:2,
   borderColor:'#082359',
   margin: '2%',
   backgroundColor:"white",
   borderRadius:10,
   alignItems:'center',
   width: windowWidth/1.1,
   height: windowHeight/20,
   justifyContent: "center",
   alignSelf: 'center'
  },
  inputsprecio: {
    borderWidth:2,
    borderColor:'#082359',
    margin: '5%',
    backgroundColor:'white',
    borderRadius:10,
    height: windowHeight/18,
    alignItems:'center',
    width: windowWidth/4,
    justifyContent: "center",
    alignSelf: 'center'
  },
  inputsdescrip: {
   borderWidth:2,
   borderColor:'#082359',
   borderRadius:10,
   margin:'2%',
   width:windowWidth/1.1,
   height: windowHeight/5,
   textAlign: 'center',
   alignSelf: 'center',
   backgroundColor:'white'
  },
  txt:{
    marginTop: 12,
    marginBottom: 2,
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 18,
    color:'#616F8C'
  },
  btnview:{
    marginTop: '2%',
    height: windowHeight/3.8,
    width:windowWidth/1.5,
   borderColor: '#616F8C',
   alignSelf:'center',
   borderWidth: 1,
   marginBottom: "7%",
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
    color:'#616F8C',
    fontSize: 15,
    textAlign:'center',
    fontWeight:'bold'

  },
  txtbtn2:{
    color:'#616F8C',
    fontSize: 10,
    textAlign:'center',
    marginTop:'5%'

  },
  btn2:{
    marginTop: '2%',
    marginBottom: '8%',
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
    width: windowWidth/1.1,
    backgroundColor:'white',
    borderColor: '#082359',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf:'center',
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