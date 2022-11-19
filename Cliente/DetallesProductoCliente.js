import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
import firebase from "../db/firebasemeds"
import db from "../db/firebasemeds";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [ total, settotal] = useState(meds.precio);
  const [ cantidad, setcantidad] = useState(0);



  const handleChange =(e) => {
    if(e<1){
      setcantidad(e)
  }else{
    setcantidad(e);
  }
  };

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
   
   //calcular total producto
      const calculartotal = () => {
       const newtotal = cantidad * meds.precio
       settotal(newtotal)
   
      }

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

  
const storeData = async () => {
  if(cantidad == ""){
    alert('cantidad no puede estar vacia')
  }else if(cantidad <=0){
      alert('la cantidad debe ser mayor a cero')
  }else{
  try {
    const oldData = await AsyncStorage.getItem('meds')
    const oldList = oldData != null ? JSON.parse(oldData) : [];
    console.log(cantidad)
    console.log(total)
    console.log("SI PASSA POR ACA")
    const group = {
      cantidad: cantidad,
      total: total,
      date: new Date().toLocaleDateString(),
      med: meds
    }
    oldList.push(group)

    const jsonValue = JSON.stringify(oldList)
    await AsyncStorage.setItem('meds', jsonValue)
    alert("Producto agregado al carrito")
  } catch (e) {
    console.log("Fallo el STORE DATA")
    console.log(e)
    // saving error
  } 
}
}


  
   const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
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
          <View style={styles.contpedido}>
            <View style={styles.contcant}>
           <View style={styles.res}>
           <TouchableOpacity style={styles.btnadd} onPress={restar}><Image style={styles.add1}  source={require("../assets/menos.png")} /></TouchableOpacity>
           </View>
            <View style={styles.cant}>
            <TextInput style={styles.cantidadtext} value = {cantidad.toString()} placeholder="0" keyboardType="numeric" onChangeText={handleChange} ></TextInput>
            </View>
          <View style={styles.suma}>
          <TouchableOpacity style={styles.btnadd} onPress={sumar} ><Image style={styles.add2}  source={require("../assets/mas.png")} /></TouchableOpacity>
          </View>
           
           
            </View>
            <View style={styles.cart}>
              <TouchableOpacity onPress={() => storeData()}>
              <Image style={styles.imagencar}  source={require("../assets/cart.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
          <Text style={styles.subtotaltxt}>SubTotal:</Text>
          <Text style={styles.subtotal}>{total.toFixed(2)}</Text>
          </View>
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
backgroundColor:'#DCE2F2'
   
  },
  subtotal:{
   fontSize: 20,
   fontWeight:"bold",
   color:'green',
   marginBottom:'5%',
   width: windowWidth/1.1,
    textAlign:'center'
  },subtotaltxt:{
    marginTop:'5%',
    fontSize: 20,
    fontWeight:"bold",
    width: windowWidth/1.1,
    textAlign:'center'
   },
  res:{
    width:windowWidth/8,
    height:windowHeight/12,
  },
  suma:{

    width:windowWidth/8,
    height:windowHeight/12,
  },
  cant:{
    width:windowWidth/8,
    height:windowHeight/12,
  },
  cart:{
    width:windowWidth/8,
    height:windowHeight/12,
    marginLeft:'40%'
  },
  imagen:{
    width:windowWidth/2,
    height:windowHeight/5.4,
    marginTop: '5%',
    marginBottom: '5%',
    alignSelf:'center',
  },
  cantidadtext:{
   alignSelf:'center',
   textAlign:'center',
   fontSize: 25
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
  top:'5%'
},
contcant:{
 flexDirection:'row',

  
},
add1:{
  width: windowWidth/12,
  height: windowHeight/24,
},
add2:{
  width: windowWidth/12,
  height: windowHeight/24,
  marginLeft:"15%"
},
imagencar:{
  width: windowWidth/10,
  height: windowHeight/20,
}

  
});    