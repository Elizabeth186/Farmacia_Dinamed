import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
import firebase from "../db/firebasemeds"
import db from "../db/firebasemeds"

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

  const [ total, setTotal] = useState(0);
  const [ cantidad, setCantidad] = useState(1);
 
  const handleChange =(e) => {
    if(e<1){
      setCantidad(e)
  }else{
    setCantidad(e);
  }
  };
  const calcularTotal = () =>{
    let newtotal = cantidad * meds.precio;
    setTotal(newtotal); 
  };

    useEffect(() => {
      
    getItemById(props.route.params.listId);
    
    calcularTotal();
  }, [cantidad]);

  const addToCart = async () => {
    
  

  if (cantidad === "") {
    alert("Por favor ingrese cantidad de productos deseada");
  }else{

    try {
      await db.db.collection("Carrito").add({

      nombre: meds.nombre,
      marca: meds.marca,
      presentacion: meds.presentacion,
      precio: meds.precio,
      cantidad: cantidad,
      total: total,
      img: meds.img
       
      });

      props.navigation.navigate("Carrito");
    } catch (error) {
      console.log(error)
    }
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
           <Text  style={styles.inputs}>Indicaciones y Contraindicaciones</Text>
            <View>
              <Text style={styles.txtdes}>{meds.descripcion}</Text>
            </View>

        <View>
          <Text style={styles.txt}>Precio por unidad:</Text>
          <Text style={styles.txtprecio}>${meds.precio}</Text>
          <Text style={styles.txt}>Inserte cantidad de productos deseada:</Text>
          <TextInput style={styles.qanty} value={cantidad.toString()} placeholder="0" keyboardType='numeric' onChangeText={handleChange}/>
          <Text style={styles.txtprecio}>${total}</Text>
        </View>

         

            <View>
              <TouchableOpacity onPress={() => addToCart()}>
              <Image style={styles.imagencar}  source={require("../assets/cart.png")} />
              </TouchableOpacity>
            </View>
          

        </View>
        
          
        
         
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
   padding: 10,
   justifyContent: "center",
   alignSelf: 'center',
   backgroundColor:'#082359',
   color:'white',
   textAlign:'center',
   height: windowHeight/15,
   marginTop: 20,
   fontSize: 20
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
    fontSize: 18,
    textAlign: 'justify',
    margin: 15
  },txt:{
    fontSize: 20,
    textAlign: 'justify',
  },
txtindicaciones:{
color:'white'
},
txtprecio:{
  fontSize: 25,
  marginTop: 15,
  marginBottom: 15,
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
  marginRight: '12%',
  height: windowHeight/24,
  marginTop: '30%',
  marginLeft: '12%',
  
},
imagencar:{
  width: windowWidth/10,
  height: windowHeight/10,
  marginTop: '20%'
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