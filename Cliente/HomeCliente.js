import { SafeAreaView, StyleSheet, Text, View , Image, ScrollView, Button, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import firebase from "../db/firebasemeds"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeCliente = (props) => {

const [meds, setMeds] = useState([]);
//traemos la coleccion 
useEffect(() => {
  firebase.db.collection("productos").onSnapshot((querySnapshot) => {
    const meds = [];
    querySnapshot.docs.forEach((doc) => {
      const { nombre, marca, presentacion, descripcion, precio, img } = doc.data();
      meds.push({
        id: doc.id,
        nombre,
        marca,
        presentacion,
        descripcion,
        precio,
        img,
      });
    });
    setMeds(meds);
  });
}, []);




  return (

    <View style={styles.container}>
      
      <SafeAreaView>
      <View style={styles.topbar}>
      <Text style={styles.txttopbar}>Dinamed</Text>
    </View>
    
    <ScrollView>
    {
    meds.map((medis) => {
      return (
        <TouchableOpacity
          key={medis.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("Detalle", {
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
        </TouchableOpacity>
      );
    })}
     </ScrollView>
     </SafeAreaView>
      </View>
  );
  
}

export default HomeCliente;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCE2F2',
    paddingTop: Platform.OS === 'android' ? 25 : 0
    
  },
  topbar:{
    width: windowWidth/1,
    height: windowHeight/14,
    backgroundColor: '#082359',
    justifyContent:'center'
  },
  txttopbar:{
    fontSize: 23,
    alignSelf:'center',
    fontWeight:'bold',
    color: '#FFFFFF',
    
  },
  View2:{
    width: windowWidth/1,
    height: windowHeight/10,
    flexDirection: 'row',
    
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
  }
  ,
  imagenbuscar:{
    width: windowWidth/10,
    height: windowHeight/20,
    alignSelf:'center',
    top: '8%',
    marginLeft:'3%',
    borderRadius:10
    
  },
  inputbuscar:{
    marginLeft:'5%',
    backgroundColor:'white',
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
    marginTop: '2%',
    elevation:5,
    backgroundColor:'white',
    width: windowWidth/1.1,
    height: windowHeight/9,
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
    width: windowWidth/2.2,
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
  }
})