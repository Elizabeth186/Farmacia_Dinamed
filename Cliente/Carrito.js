import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View , Image, ScrollView, Button, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Carrito({props}) {

  const initialState = {
    id: "",
    nombre: "",
    marca: "",
    presentacion:"",
    precio: "",
    total: "",
    img: ""

  };
  const [meds, setMeds] = useState(initialState);

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



  return (
    
    <View style={styles.container}>

        
<ScrollView>
      
      {
      meds.map((medis) => {
        return (
        
          <TouchableOpacity
         
            key={medis.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Detalles", {
                listId: medis.id,
              });
            }}
            >
           
         <View style={styles.contenedores}>
         <Image
         style={styles.imagenproducto}
         source={{uri: medis.img}} />
         <View style={styles.view1}>
         <Text style={styles.titulo}>{medis.nombre}</Text>
         <Text style={styles.txt}>{medis.marca}</Text>
         </View >
         <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.LinearGradient} >
         <View style={styles.viewprecio}>
        
         <Text style={styles.precio}>{medis.precio}</Text>
         
         </View>
         </LinearGradient>
          </View>
            {/* <ListItem.Content  alignItems='center'>
              <ListItem.Title style={styles.titulo}>{medis.nombre}</ListItem.Title>
              <ListItem.Subtitle >{medis.descripcion}</ListItem.Subtitle>
              
            </ListItem.Content>
            <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.LinearGradient}>
            <ListItem.Content  width = {70} alignItems='center'  >
              <ListItem.Subtitle style={styles.pricestyle} >{medis.precio}</ListItem.Subtitle>
              </ListItem.Content>
              </LinearGradient>
               */}
          
          </TouchableOpacity>
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
  },
  btnstyle: {
   borderRadius: 10,
   width: windowWidth/1.5,
  height: windowHeight/15,
  elevation: 5,
  alignSelf:'center',
  marginTop: '15%',
  marginBottom: '10%'
  },
  imagen:{
    width: windowWidth/4.5,
    height: windowHeight/10,
    alignSelf:'center',
    top: -60
  },
  inputs:{
    alignSelf:'center',
    marginTop: '2%',
    textAlign:'center',
  borderTopColor: 'black',
  borderTopWidth: 0.5,
  width: windowWidth/1.5,
  height: windowHeight/15,
  elevation: 5,
  backgroundColor: 'white',
  borderBottomRightRadius: 10,
  borderTopLeftRadius:10
  },
  textstyle:{
    textAlign: 'left',
    fontSize: 18,
    marginTop: '5%',
  },
  textbtn:{
    textAlign: 'center',
    fontSize: 18,
    color:'white',
    padding: 11
  }
  
});