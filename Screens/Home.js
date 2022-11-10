import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View , Image, ScrollView, Button, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native'
import { ListItem, Avatar } from "react-native-elements";
import { useState, useEffect } from 'react';
import firebase from "../db/firebasemeds"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Home = (props) => {
  const [meds, setMeds] = useState([]);


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
        img
      });
    });
    setMeds(meds);
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
       <Text style={styles.txt}>{medis.presentacion}</Text>
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

     <TouchableOpacity style={styles.btnflotan} onPress={()=>{
             props.navigation.navigate('Agregar')}}><Image
             style={styles.tinyLogo}
             source={require('../assets/add.png')}
           /></TouchableOpacity>
 
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
    backgroundColor: '#DCE2F2',
    top:'1%'
    
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
    height: windowHeight/6.4,
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
    height: windowHeight/6,
    borderRadius: 10
  },
  titulo:{
    textAlign:'center',
    fontSize:19,
    padding: '9%'
    
  },
  precio:{
    textAlign:'center',
    fontSize:19,
    marginTop:'50%',
    color: 'white',
    fontWeight:'bold',
    height: windowHeight/8

  },
  txt:{
    textAlign:'center'
  },
  view1:{
    width: windowWidth/2.3,
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