import React, { useState, useEffect, Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions, ActivityIndicator, Image,Alert,ScrollView, TextInput, FlatList,Button,} from 'react-native';
import firebase from "../db/firebasemeds";
import db from "../db/firebasemeds"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CarritoDetalle  = (props) =>{

  const initialState = {
    id: "",
    nombre: "",
    marca: "",
    presentacion:"",
    precio: "",
    cantidad: "",
    total: "",
    img: ""

  };

  const [meds, setMeds] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setMeds({ ...meds, [prop]: value });
  };

  const getItemById = async (id) => {
    
    
    const dbRef = firebase.db.collection("Carrito").doc(id);
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

    const deleteItem = async () => {
        setLoading(true)
        const dbRef = firebase.db
        .collection("Carrito")
        .doc(props.route.params.listId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Carrito");
    };


  
  const updateItem = async () => {
    
  

    if (cantidad === "") {
      alert("Por favor ingrese cantidad de productos deseada");
    }else{
  
      try {
        const listrRef = firebase.db.collection("productos").doc(meds.id);
    await listrRef.set({
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
          <View style={{alignItems:'center', marginHorizontal:30}}>
                <Image style={styles.imagen}source={{uri:meds.img}} />
                <Text style={styles.txtname}>Nombre de la farmacia</Text>
                <View style={styles.inputs}>
                <Text>{meds.Farmacia}</Text>
                </View>
                <Text style={styles.txtname}>Nombre de producto</Text>
                <View style={styles.inputs}>
                <Text>{meds.nombre}</Text>
                    </View>
                <Text style={styles.txtname}>Marca</Text>
                <View style={styles.inputs}>
                <Text>{meds.marca}</Text>
                    </View>
                <Text style={styles.txtname}>Presentacion del producto</Text>
                <View style={styles.inputs}>
                <Text>{meds.presentacion}</Text>
                    </View>
                    <Text style={styles.txtname}>Precio del producto</Text>
                <View style={styles.inputs}>
                <Text>{meds.precio}</Text>
                    </View>
                    <Text style={styles.txtname}>Cantidad</Text>
                
                <Text style={styles.txt1}>*Inserte cantidad de productos deseada:</Text>
                <TextInput style={styles.inputsprecio} value={cantidad.toString()} placeholder="0" keyboardType='numeric' onChangeText={handleChange}/>
                <Text style={styles.txtname}>Su total es:</Text>
                <Text style={styles.txtTotal}>${total}</Text>
                
           </View>
          <View style={styles.separator}></View>

          <View style={styles.btn}>

            <View style={styles.btndelete}><TouchableOpacity onPress={() => deleteItem()}><Image style={styles.imagend}  source={require("../assets/borrar.png")} /></TouchableOpacity></View>
            <View style={styles.btneditar}><TouchableOpacity onPress={() => updateItem()}><Image style={styles.imagend}  source={require("../assets/editar.png")} /></TouchableOpacity></View>
    </View>
          
        </ScrollView>
      </View>
    );
  
}

export default CarritoDetalle;
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  imagen:{
    width:windowWidth/1,
    height:300,
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
    color:'blue',
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
   alignSelf: 'center',
   paddingLeft:'13%'
   
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
  txt1: {
    fontSize:20,
    color:"#3CB371",
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
    marginTop: '15%',
    height:windowHeight/7
  },
  imagend:{
    width: windowWidth/6.5,
    height: windowHeight/13,
  },
  btndelete:{
    marginRight: '12%'
  },
  txtTotal:{
    fontSize:22,
    color:"#082359",
    fontWeight:'bold',
    textAlign:'center',
    marginBottom: "3%"
  }
});    