import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View , Image, ScrollView, Button, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import firebase from "../db/firebasemeds"
import db from "../db/firebasemeds"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Pedidos (props) {

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
  const [meds, setMeds] = useState([]);
  
  
  

  useEffect(() => {
    firebase.db.collection("pedidos").onSnapshot((querySnapshot) => {
      const meds = [];
      querySnapshot.docs.forEach((doc) => {
        const { farmacia, fechapedido, productos, total } = doc.data();
        meds.push({
          id: doc.id,
          farmacia,
          fechapedido,
          productos,
          total
        });
      });
      setMeds(meds);
      
    });
  }, []);
  

  


  return (
    
    <View style={styles.container}>
    <View style={styles.topbar}>
      <Text style={styles.txttopbar}>Pedidos</Text>
    </View>
        
<ScrollView>
      
      {
      meds.map((medis) => {
        return (
        
          
           
         <View style={styles.contenedores}key={medis.id}
            bottomDivider>
         
         
         <View style={styles.viewfecha}>
         <Text style={styles.txtfecha}>{medis.fechapedido.toString()}</Text>
         </View >
         <View style={styles.viewfarmacia}>
         <Text style={styles.titulo}>{medis.farmacia}</Text>
         </View>
         <View style={styles.viewtotal}>

         </View>
         <Text style={styles.txt}>{medis.total}</Text>

         
         <TouchableOpacity
          key={medis.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("detallesPedido", {
              listId: medis.id,
            });
           }}
          >
         <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.LinearGradient} >
         <View style={styles.viewprecio}>
         <Text style={styles.precio}>Ver</Text>
         </View>
         </LinearGradient>
         </TouchableOpacity>
        </View>
           
          
          
        );
      })}
      
       </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCE2F2',
    paddingTop: "5%"
    
  },
  topbar:{
    width: windowWidth/1,
    height: windowHeight/12,
    backgroundColor: '#082359',
    
  },
  txttopbar:{
    fontSize: 30,
    alignSelf:'center',
    padding: "2.5%",
    fontWeight:'bold',
    color: '#FFFFFF'
  },
  imagen:{
    width: windowWidth/7,
    height: windowHeight/17,
    alignSelf:'center',
    marginLeft:'5%',
    top:'-3%',
    
  },
  contenedores:{
    marginTop: '5%',
    marginBottom: '5%',
    elevation:5,
    backgroundColor:'red',
    width: windowWidth/1.09,
    height: windowHeight/4,
    borderRadius: 10
    
  },
  titulo:{
    textAlign:'left',
    fontSize:20,
    margin:'5%',
    fontWeight: 'bold'
    
  },
  precio:{
    textAlign:'center',
    fontSize:19,
    marginTop:'30%',
    color: 'white',
    fontWeight:'bold',
    height: windowHeight/25

  },
  txtfecha:{
    textAlign:'center',
    top:'15%',
    
  },
  viewfecha:{
    width: windowWidth/4,
    height: windowHeight/20,
    borderRadius: 10,
    backgroundColor: '#ff2359',
    
  },
  viewfarmacia:{
    width: windowWidth/4,
    height: windowHeight/20,
    borderRadius: 10,
    backgroundColor: '#fff59',
    marginLeft:'10%'
  },
  viewtotal:{
    width: windowWidth/4,
    height: windowHeight/15,
    borderRadius: 10,
    backgroundColor: '#fff59',
    flexDirection:'column',
    marginLeft:'60%'
  },
  viewprecio:{
    borderRadius: 10,
    padding: 1,
    width: windowWidth/7,
  },
  LinearGradient:{
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems:'center',
    height: windowHeight/12,

  }
})
