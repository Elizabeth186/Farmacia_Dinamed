import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
import firebase from "../db/firebasemeds"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DetallesProductoCliente  = (props) =>{

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
          <View style={{alignItems:'center', width: windowWidth/1, backgroundColor:'white'}}>
            <Image style={styles.imagen}source={{uri:meds.img}} />
            </View>
           
        
  
        <View style={styles.items}>
          <Text style={styles.txttitulo}>{meds.nombre}</Text>
        <View>
          <Text style={styles.txt}>{meds.marca}</Text>
        </View>

        <View>
          <Text>{meds.presentacion}</Text>
        </View>

        <View>
          <Text style={styles.txtprecio}>${meds.precio}</Text>
        </View>

          <View style={styles.contpedido}>
            <View style={styles.contcant}>
           
           <TouchableOpacity style={styles.btnadd} ><Image style={styles.add}  source={require("../assets/menos.png")} /></TouchableOpacity>
           <TextInput  placeholder="0" keyboardType="numeric" ></TextInput>
           <TouchableOpacity style={styles.btnadd}  ><Image style={styles.add}  source={require("../assets/mas.png")} /></TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
              <Image style={styles.imagencar}  source={require("../assets/cart.png")} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <Text  style={styles.inputs}>Indicaciones y Contraindicaciones</Text>
        <View>
          <Text style={styles.txtdes}>{meds.descripcion}</Text>
        </View>
          <View style={styles.separator}></View>
        
         
        </ScrollView>
      </View>
    );
  
}

export default DetallesProductoCliente;
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
   borderWidth:1,
   borderColor:'#368DD9',
   width: windowWidth/1,
   padding: 7,
   justifyContent: "center",
   alignSelf: 'center',
   backgroundColor:'#082359',
   color:'white',
   textAlign:'center',
   height: windowHeight/20,
   marginTop: 20
  },
  items:{
    fontSize: 20,
    alignSelf:'center',
    alignItems:'center',
    textAlign:'center',
   
  },
  txttitulo:{
fontSize: 30,
fontWeight:'bold'
  },
  txtdes:{
    fontSize: 16,
    textAlign: 'justify',
    margin: 10
  },txt:{
    fontSize: 20,
  },
txtindicaciones:{
color:'white'
},
txtprecio:{
  fontSize: 25,
  marginTop: 15,
  color:'#368DD9'
},
contpedido:{

  flexDirection: 'row',
},
contcant:{
  flexDirection: 'row',

  
},
add:{
  width: windowWidth/12,
  marginRight: '25%',
  height: windowHeight/24,
  marginTop: '50%'
},
imagencar:{
  width: windowWidth/10,
  height: windowHeight/20,
  marginTop: '120%'
}
  
});    