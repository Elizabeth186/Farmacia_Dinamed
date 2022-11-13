import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button, SafeAreaView,} from 'react-native';
import firebase from "../db/firebasemeds";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const DetallesProducto  = (props) =>{

  const initialState = {
    id: "",
    nombre: "",
    marca: "",
    presentacion:"",
    descripcion: "",
    precio: "",
    img: ""

  };

  const [meds, setMeds] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setMeds({ ...meds, [prop]: value });
  };
  //Llamando coleccion Productos
  const getItemById = async (id) => {    
    const dbRef = firebase.db.collection("productos").doc(id);
    const doc = await dbRef.get();
    const meds = doc.data();
    setMeds({ ...meds, id: doc.id });
    setLoading(false);
  };
    useEffect(() => {
    getItemById(props.route.params.listId);
  }, []);

  //eliminando producto
  const deleteItem = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("productos")
      .doc(props.route.params.listId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Home");
  };

//Actualizando lista
  const updateList = async () => {
    //validando 
    if (meds.nombre === "") {
      alert("Por favor ingrese nombre");
    } else if(meds.marca === ""){
      alert("Por favor ingrese la marca");
    } else if(meds.presentacion === ""){
      alert("Por favor ingrese presentacion del producto");
    } else if(meds.descripcion === ""){
      alert("Por favor ingrese la descripcion");
    } else if(meds.precio === ""){
      alert("Por favor ingrese el precio");
    
//necensitarevisionnn+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
    // else if(!validandoprice(meds.precio)){
    //   alert("Precio debe contener al menos 1 entero(Maximo 4) y dos decimales");
    // }
    else if(meds.img == ""){
      alert("El producto no contiene el url de la imagen")
    }else{
    const listrRef = firebase.db.collection("productos").doc(meds.id);
    await listrRef.set({
      nombre: meds.nombre,
      marca: meds.marca,
      presentacion: meds.presentacion,
      descripcion: meds.descripcion,
      precio: meds.precio,
      img: meds.img
    });
    setMeds(initialState);
    props.navigation.navigate("Home");
  }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
    return (
      <View style={styles.container}>
        <SafeAreaView>
        <ScrollView>
          <View style={styles.viewcontainer}>
            <View style={styles.viewimagen}>
            <Image style={styles.imagen}source={{uri:meds.img}} />
            </View>
            <Text style={styles.txt}>Nombre del producto</Text>
            <View style={styles.inputs}>         
        <TextInput
          placeholder="Acetaminofen"
          onChangeText={(value) => handleTextChange(value, "nombre")}
          value={meds.nombre}/>
      </View>
      <Text style={styles.txt}>Marca/Laboratio</Text>
      <View style={styles.inputs}>
        <TextInput
          placeholder="MK"
          onChangeText={(value) => handleTextChange(value, "marca")}
          value={meds.marca}/>
      </View>
      <Text style={styles.txt}>Presentacion del producto</Text>
      <View style={styles.inputs}>
        <TextInput
          placeholder="Tabletas 500mg x 100 Tb"
          onChangeText={(value) => handleTextChange(value, "presentacion")}
          value={meds.presentacion}/>
      </View>
      <Text style={styles.txt}>Descripcion del producto</Text>
      <View style={styles.inputsdescrip}>
        <TextInput
          placeholder="Alivia el dolor de cabeza, dolores provocados por catarro comun, gripe, vacunaciones, enfermedades virales, dolores de dientes, dolores de oidos y dolores de garganta."
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleTextChange(value, "descripcion")}
          value={meds.descripcion}/>
      </View>
      <Text style={styles.txt}>Enlace de la imagen</Text>
      <View style={styles.inputs}>
        <TextInput
          placeholder="URL"
          onChangeText={(value) => handleTextChange(value, "img")}
          value={meds.img}/>
      </View>
      <View style={styles.inputsprecio}>
        <TextInput
          placeholder="$ 7.44"
          onChangeText={(value) => handleTextChange(value, "precio")}
          value={meds.precio}
          keyboardType="numeric"/>
      </View>
           </View>
          <View style={styles.btn}>
            <View style={styles.btndelete}><TouchableOpacity onPress={() => deleteItem()}><Image style={styles.imagend}  source={require("../assets/borrar.png")} /></TouchableOpacity></View>
            <View style={styles.btneditar}><TouchableOpacity onPress={() => updateList()}><Image style={styles.imagend}  source={require("../assets/editar.png")} /></TouchableOpacity></View>
      </View>
        </ScrollView>
        </SafeAreaView>
      </View>
    );
  
}

export default DetallesProducto;
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#DCE2F2'
  },
  imagen:{
    width:windowWidth/2,
    height:windowHeight/6.4,
    marginTop: '5%',
    marginBottom: '5%',
    alignSelf:'center',
    borderRadius:12,
   
  },
  viewimagen:{
    width:windowWidth/1.9,
    height:windowHeight/5.8,
    borderColor: '#082359',
    borderWidth: 3,
    borderRadius:10,
    marginTop: '1%',
    backgroundColor:'white',
    marginBottom:"5%",
    alignSelf:'center',
    justifyContent:'center'
  },
  viewcontainer:{
    width:windowWidth/1,
    height:windowHeight/1,
    alignSelf:'center',
  },
  lab:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold',
    textAlign:'center', 
  },
  inputs: {
    color:'red',
   borderWidth:2,
   borderColor:'#082359',
   borderRadius:10,
   marginTop:'2%',
   marginBottom:'2%',
   alignItems:'center',
   width: windowWidth/1.1,
   height: windowHeight/20,
   justifyContent: "center",
   alignSelf: 'center',
   backgroundColor:'white'
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
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  txt: {
    fontSize:18,
    color:"#696969",
    fontWeight:'bold',
    textAlign:'center',
    color:'#616F8C'
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#082359",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  },
  btn:{
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '15%',
    height:windowHeight/7
  },
  imagend:{
    width: windowWidth/6.5,
    height: windowHeight/13,
  },
  btndelete:{
    marginRight: '12%'
  }
});    