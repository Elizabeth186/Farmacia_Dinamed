import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
import firebase from "../db/firebasemeds"
import db from "../db/firebasemeds";


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
    cantidad: "",
    img: "",
     
  };

  const [meds, setMeds] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [ total, settotal] = useState(0);
  const [ cantidad, setCantidad] = useState(0);

  const handleTextChange = (value, prop) => {
    setMeds({ ...meds, [prop]: value });
  };

  const handleChange =(e) => {
    if(e<1){
      setCantidad(e)
  }else{
    setCantidad(e);
  }
  };

//Traemos la coleccion
  const getItemById = async (id) => {    
    const dbRef = firebase.db.collection("productos").doc(id);
    const doc = await dbRef.get();
    const meds = doc.data();
    setMeds({ ...meds, id: doc.id });
    setLoading(false);
  };

  

    useEffect(() => {
    getItemById(props.route.params.listId);
    calculartotal()}, [cantidad]);

  const addToCart = async (id) => {
    
  if (cantidad === "") {
    alert("Por favor ingrese cantidad de productos deseada");

  }else if(cantidad <= 0 ){
    alert("Ingrese una cantidad valida")
  }else{

    try {
      await db.db.collection("Carrito").add({

      nombre: meds.nombre,
      marca: meds.marca,
      presentacion: meds.presentacion,
      precio: meds.precio,
      cantidad: cantidad,
      total: total,
      img: meds.img,
      date: new Date().toLocaleDateString(),
       
      });

     alert("Producto agregado al carrito")
    } catch (error) {
      console.log(error)
    }
  }
};
  
//calcular total producto
   const calculartotal = () => {
    const newtotal = cantidad * meds.precio
    settotal(newtotal)
   }
  


 //sumando producto
 const sumar =  () => {
  let nuevacantidad = parseInt(cantidad +1)
  setcantidad(nuevacantidad)
 }
//restando producto
 const restar =  () => {
   if(cantidad > 1){
   let nuevacantidad = parseInt(cantidad -1)
   setcantidad(nuevacantidad)
   }
  }
  
  
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
          <Text>{total}</Text>
          <View style={styles.contpedido}>
            <View style={styles.contcant}>
           
            <TextInput style={styles.inputsprecio} value={cantidad.toString()} placeholder="0" keyboardType='numeric' onChangeText={handleChange}/>
           
            </View>
            <View>
              <TouchableOpacity onPress={() => addToCart()}>
              <Image style={styles.imagencar}  source={require("../assets/cart.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View><Text>Digite la cantidad</Text>
        <TextInput value = {cantidad.toString()} placeholder="0" keyboardType="numeric" ></TextInput>
        </View>
        <Text  style={styles.texto}>Indicaciones y Contraindicaciones</Text>
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
    width:windowWidth/2,
    height:windowHeight/5.4,
    marginTop: '5%',
    marginBottom: '5%',
    alignSelf:'center',
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
  texto: {
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
  },txt:{
    fontSize: 20,
  },
txtindicaciones:{
color:'white'
},
txtprecio:{
  fontSize: 25,
  marginTop: '3%',
  color:'#368DD9'
},
contpedido:{

  flexDirection: 'row',
},
contcant:{
  padding: 10,
  height: windowHeight/24,

  
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
  marginTop: '110%'
},
qanty: {
    fontSize:"25",
    borderWidth:1,
    borderColor:'#368DD9',
    margin: 5,
    marginTop: 25,
    paddingLeft: 10,
    borderRadius:10,
    height: windowHeight/18,
    alignItems:'center',
    width: windowWidth/4,

   },
   farmacia: {
    fontSize:"25",
    borderWidth:1,
    borderColor:'#368DD9',
    margin: 5,
    marginTop: 25,
    paddingLeft: 10,
    borderRadius:10,
    height: windowHeight/18,
    alignSelf:'center',
    alignItems:'center',
    width: windowWidth/1.1,

   },

  
});    