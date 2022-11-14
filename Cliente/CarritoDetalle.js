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
    img: "",
    date:""

  };

  const [meds, setMeds] = useState(initialState);
  const [loading, setLoading] = useState(true);

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
    }
      else if(cantidad <=0){
      alert("La cantidad de productos no puede ser menor a 1");

    }else{
  
      try {
        const listrRef = firebase.db.collection("Carrito").doc(meds.id);
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
  imagen:{
    width:windowWidth/2,
    height:windowHeight/4.2,
    marginTop: '2%'
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
   textAlign: 'center'
   
  },
txtname: {
    fontSize:18,
    color:"#696969",
    fontWeight:'bold',
    textAlign:'center',
    marginBottom: "3%"
  },
  txt1: {
    fontSize:17,
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
  contenedorrow:{
    flexDirection:'row', 
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
  
  btn:{
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '15%',
    height:windowHeight/7
  },
  imagend:{
    width: windowWidth/12,
    height: windowHeight/22,
  },
  btneditar:{
    borderColor:'#368DD9',
    borderWidth: 2,
    width: windowWidth/8,
    height: windowHeight/15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'white'
  },
  btndelete:{
    borderColor:'#368DD9',
    borderWidth: 2,
    marginRight: '10%',
    width: windowWidth/8,
    height: windowHeight/15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'white'
  },
  txtTotal:{
    fontSize:22,
    color:"#082359",
    fontWeight:'bold',
    textAlign:'center',
  }
});    