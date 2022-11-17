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
         <Image
         style={styles.imagenproducto}
         source={{uri: medis.img}} />
         <View style={styles.view1}>
         <Text style={styles.titulo}>{medis.farmacia}</Text>
         <Text style={styles.txt}>{medis.marca}</Text>
         <Text style={styles.txt}>{medis.presentacion}</Text>
         <Text style={styles.txt}>{medis.precio}</Text>
         <Text style={styles.txt}>{medis.cantidad}</Text>
         <Text style={styles.txt}>{medis.total}</Text>
         
         </View >
         <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.LinearGradient} >
         <View style={styles.viewprecio}>
        
         <Text style={styles.precio}>{medis.precio}</Text>
         
         </View>
         </LinearGradient>
         <View style={styles.btndelete}><TouchableOpacity
       
       key={medis.id}
       bottomDivider
       onPress={() => {
         props.navigation.navigate("DetalleCarrito", {
           listId: medis.id,
         });
       }}
       ><Text>Ver</Text></TouchableOpacity></View>
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
  View2:{
    width: windowWidth/1,
    height: windowHeight/10,
    flexDirection: 'row',  
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
    
  }
  ,
  imagenproducto:{
    width: windowWidth/4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
  ,
  imagenbuscar:{
    width: windowWidth/10,
    height: windowHeight/19,
    alignSelf:'center',
    top: '8%',
    marginLeft:'3%',
    borderRadius:10,
    
    
  },
  contenedores:{
    alignSelf:'center',
    flexDirection:'row',
    marginTop: '2%',
    elevation:5,
    backgroundColor:'white',
    width: windowWidth/1.09,
    height: windowHeight/5.4,
    borderRadius: 10
  },
  titulo:{
    textAlign:'center',
    fontSize:19,
  top:'15%'
    
  },
  precio:{
    textAlign:'center',
    fontSize:19,
    marginTop:'35%',
    color: 'white',
    fontWeight:'bold',
    height: windowHeight/8

  },
  txt:{
    textAlign:'center',
    top:'15%'
  },
  view1:{
    width: windowWidth/2.8,
    borderRadius: 10,
  },
  viewprecio:{
    borderRadius: 10,
    padding: 1,
    width: windowWidth/4.7,
  },
  LinearGradient:{
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  imagend:{
    width: windowWidth/10,
    height: windowHeight/10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    
  }
,
btnflotan:{
  position: 'absolute',
  width: windowHeight/12,
  height: windowHeight/12,
  backgroundColor:'#082359',
  borderRadius: 40,
  bottom: 40,
  right: 15,
  elevation: 30,
  borderColor: '#DCE2F2',
  borderWidth: 3
},
tinyLogo:{
  width: windowWidth/12,
  height: windowHeight/23,
  alignSelf:'center',
  top:'20%'
}
})
