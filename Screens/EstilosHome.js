import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View , Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import firebase from "../db/firebase";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 const  Home = (props) => {
 

  const [list, setList] = useState([]);

  useEffect(() => {
    firebase.db.collection("Productos").onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, descripcion } = doc.data();
        list.push({
          id: doc.id,
          nombre,
          descripcion,
    
        });
      });
      setList(list);
    });
  }, []);

  return (
  <View style={styles.container}>
    <SafeAreaView>
     
    <View style={styles.View2}>
     <TextInput style={styles.inputbuscar} placeholder='Buscar'/>
       <TouchableOpacity style={styles.btnbuscar}>
       <Image
        style={styles.imagenbuscar}
        source={require("../Images/buscar.png")} />
       </TouchableOpacity>
      <Image
        style={styles.imagen}
        source={require("../Images/Logo.png")} />
    
    </View>

    {/* I=Contenedor de productos */}

   
    { 
      list.map((lista, i)=>
       <View style={styles.contenedores}>
       <Image
       style={styles.imagenproducto}
       source={require("../Images/Logo.png")} />
       <View style={styles.view1}>
       <Text style={styles.titulo}>lista.nombre</Text>
       <Text style={styles.txt}>Marca</Text>
       <Text style={styles.txt}>Presentacion</Text>
       </View >

       <View style={styles.viewprecio}>
       <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.LinearGradient} >
       <Text style={styles.precio}>Precio</Text>
       </LinearGradient>
       </View>
        </View>
     )
    }
        <View style={styles.contenedores}>
       <Image
       style={styles.imagenproducto}
       source={require("../Images/Logo.png")} />
       <View style={styles.view1}>
       <Text style={styles.titulo}>Nombre</Text>
       <Text style={styles.txt}>Marca</Text>
       <Text style={styles.txt}>Presentacion</Text>
       </View >
       
       <View style={styles.viewprecio}>
       <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.LinearGradient} >
       <Text style={styles.precio}>Precio</Text>
       </LinearGradient>
       </View> 
        </View>

        
        


    
    
    </SafeAreaView>
  </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top:'-24%'
  },
  View2:{
    width: windowWidth/1,
    height: windowHeight/10,
    flexDirection: 'row',
  },
  imagen:{
    width: windowWidth/6,
    height: windowHeight/13,
    alignSelf:'center',
    top: '-4%',
    marginLeft:'5%'
  }
  ,
  imagenproducto:{
    width: windowWidth/6,
    height: windowHeight/13,
    top: '1%',
    marginLeft:'3%'
   
  }
  ,
  imagenbuscar:{
    width: windowWidth/10,
    height: windowHeight/19,
    alignSelf:'center',
    top: '8%',
    marginLeft:'3%',
    borderRadius:10
    
  },
  inputbuscar:{
    marginLeft:'5%',
    backgroundColor:'#DCE2F2',
  borderTopColor: 'black',
  borderTopWidth: 0.5,
  width: windowWidth/2,
  height: windowHeight/15,
  elevation: 5,
  borderBottomRightRadius: 10,
  borderTopLeftRadius:10,
  color:'black',
   fontSize: 15
  },
  contenedores:{
    alignSelf:'center',
    flexDirection:'row',
    marginTop: '10%',
    elevation:5,
    backgroundColor:'white',
    width: windowWidth/1.2,
    height: windowHeight/10,
    borderRadius: 10
  },
  titulo:{
    textAlign:'center',
    fontSize:19,
    padding: '2%'
    
  },
  precio:{
    textAlign:'center',
    fontSize:19,
    padding:'8%',
    color: 'white',
    fontWeight:'bold'

  },
  txt:{
    textAlign:'center'
  },
  view1:{
    width: windowWidth/2.6,
    borderRadius: 10,
  },
  viewprecio:{
    borderRadius: 10,
    padding: 1
   
  },
  LinearGradient:{
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  }
});
