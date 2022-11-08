import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
import firebase from "../db/firebasemeds";

const DetallesProducto  = (props) =>{

  const initialState = {
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",

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
            <Image style={styles.imagen}source={require("../Images/aceta.jpg")} />

            <TextInput
        placeholder="Nombre"
        autoCompleteType="nombre"
        style={styles.inputGroup}
        value={meds.nombre}
        onChangeText={(value) => handleTextChange(value, "nombre")}
      />

            <TextInput
        placeholder="Descripcion"
        autoCompleteType="Descripcion"
        style={styles.inputGroup}
        value={meds.descripcion}
        onChangeText={(value) => handleTextChange(value, "descripcion")}
      />
            <TextInput
        placeholder="$0.00"
        autoCompleteType="precio"
        style={styles.inputGroup}
        value={meds.precio}
        onChangeText={(value) => handleTextChange(value, "precio")}
      />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.btn}>
      <Button
        title="Eliminar"
        onPress={() => deleteItem()}
        color="red"
      />
    </View>
    <View style={styles.btn}>
      <Button title="Actualizar" onPress={() => updateList()} color="#19AC52" />
    </View>
          
        </ScrollView>
      </View>
    );
  
}

export default DetallesProducto;
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:80,
  },
  imagen:{
    width:200,
    height:200,
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
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'left',
    marginTop:10,
    color:"#696969",
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
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
  }
});    