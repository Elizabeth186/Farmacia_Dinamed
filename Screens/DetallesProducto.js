import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
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

  const deleteItem = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("productos")
      .doc(props.route.params.listId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("Home");
  };

  const updateList = async () => {
    const listrRef = firebase.db.collection("productos").doc(meds.id);
    await listrRef.set({
      nombre: meds.nombre,
      marca: meds.marca,
      presentacion: meds.presentacion,
      descripcion: meds.descripcion,
      precio: meds.precio
    });
    setMeds(initialState);
    props.navigation.navigate("Home");
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
        <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
            <Image style={styles.imagen}source={{uri:meds.img}} />
            <Text style={styles.txtname}>Nombre del producto</Text>
            <View style={styles.inputs}>
        
        <TextInput
          placeholder="Acetaminofen"
          onChangeText={(value) => handleTextChange(value, "nombre")}
          value={meds.nombre}
        />
      </View>
      <Text style={styles.txtname}>Marca/Laboratio</Text>
      <View style={styles.inputs}>
        <TextInput
          placeholder="MK"
          onChangeText={(value) => handleTextChange(value, "marca")}
          value={meds.marca}
        />
      </View>
      <Text style={styles.txtname}>Presentacion del producto</Text>
      <View style={styles.inputspresentacion}>
        <TextInput
          placeholder="Tabletas 500mg x 100 Tb"
          onChangeText={(value) => handleTextChange(value, "presentacion")}
          value={meds.presentacion}
        />
      </View>
      <Text style={styles.txtname}>Descripcion del producto</Text>
      <View style={styles.inputsdescrip}>
        <TextInput
          placeholder="Alivia el dolor de cabeza, dolores provocados por catarro comun, gripe, vacunaciones, enfermedades virales, dolores de dientes, dolores de oidos y dolores de garganta."
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleTextChange(value, "descripcion")}
          value={meds.descripcion}
        />
      </View>
      <View style={styles.inputsprecio}>
        <TextInput
          placeholder="$ 7.44"
          onChangeText={(value) => handleTextChange(value, "precio")}
          value={meds.precio}
          keyboardType="numeric"
        />
      </View>
           </View>
          <View style={styles.separator}></View>

          <View style={styles.btn}>

            <View style={styles.btndelete}><TouchableOpacity onPress={() => deleteItem()}><Image style={styles.imagend}  source={require("../assets/borrar.png")} /></TouchableOpacity></View>
            <View style={styles.btneditar}><TouchableOpacity onPress={() => updateList()}><Image style={styles.imagend}  source={require("../assets/editar.png")} /></TouchableOpacity></View>
    </View>
          
        </ScrollView>
      </View>
    );
  
}

export default DetallesProducto;
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  imagen:{
    width:200,
    height:200,
    marginTop: 35,
    marginBottom: 12
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold',
    textAlign:'right', 
  },
  lab:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold',
    textAlign:'center', 
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
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },txtname: {
    fontSize:18,
    color:"#696969",
    fontWeight:'bold',
    textAlign:'center',
    marginBottom: "3%"
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
    marginTop: '15%'
  },
  imagend:{
    width: windowWidth/6.5,
    height: windowHeight/13,
  },
  btndelete:{
    marginRight: '12%'
  }
});    