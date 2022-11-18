import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View , Image, ScrollView,Linking, Button, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {deleteDoc} from 'firebase/firestore'
import firebase from "../db/firebasemeds"
import db from "../db/firebasemeds"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs  } from "firebase/firestore";
import { sum } from 'lodash';
import { async } from '@firebase/util';
import Pedidos from '../Screens/Pedidos';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 

export default function Carrito(props) {

 

  
  const [groups, setGroups,] = useState([]);
  const [count, setCount] = useState(1);
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('meds')
      const newMeds = jsonValue != null ? JSON.parse(jsonValue) : [];
      var totalCarrito = 0
      groups.forEach(group => {
        
        totalCarrito += group.total
      }) 

      setCount(totalCarrito);
      setGroups(newMeds);
    } catch(e) {
      console.log(e)
    }
    
  }

  

  useEffect(() => {
    getData()
    

  }, []);
  
  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
  }

  function finalizar(){
    let producto =[];
    
   
    groups.forEach(group => {
      const date = group.date
      producto.push(
                    "--------------------------------------------"+
                    '\n'+"- Producto: "+group.med.nombre+
                    '\n'+"- Presentacion: "+ group.med.presentacion+
                    '\n'+"- Cantidad: "+ group.cantidad+
                    '\n'+"- Precio Unitario: $ "+ group.med.precio+
                    '\n'+"- SubTotal: $ "+group.total+'\n'                   )

      const productosConFormatoAmigable = producto.join('\n');
      Linking.openURL('https://api.whatsapp.com/send?phone=50372298350&text=Me interesan los siguientes productos'+
      '\n'+ '\n'+"- Empresa: "+user.displayName + ' '+
      '\n'+ '\n'+"- Fecha: "+ date + ' '
       + productosConFormatoAmigable+'\n'+"*****************************"+
      '\n'+"- Total a pagar: $ "+count.toFixed(2),
      
      
      )
    
    })
    console.log(JSON.stringify(producto));
    
  }
     
  

  const auth = getAuth();
  const user = auth.currentUser;
  

 

  return (
    
    <View style={styles.container}>
     
    <View style={styles.topbar}>
      <Text style={styles.txttopbar}>Carrito</Text>
    </View>
    <View style={styles.topbar1}>
      <View style={styles.topbar2}>
        <TouchableOpacity onPress={() => getData()}><Text style={styles.txttopbar2}>Actualizar</Text></TouchableOpacity>
        
        </View>
        <View style={styles.topbar3}>
        <TouchableOpacity onPress={() => clearAppData()}><Text style={styles.txttopbar3}>Borrar carro</Text></TouchableOpacity>
        </View>
    </View>
      
<ScrollView>
      
      {
      groups.map((group) => {
        return (
        
          
           
         <View style={styles.contenedores}key={group.med.id}
            bottomDivider>
         <Image
         style={styles.imagenproducto}
         source={{uri: group.med.img}} />
         <View style={styles.view1}>
         <Text style={styles.titulo}>{group.med.nombre}</Text>
         <Text style={styles.txt}>{group.med.marca}</Text>
         <Text style={styles.txt}>{group.med.presentacion}</Text>
         <Text style={styles.txt}>{group.med.precio}</Text>
         <Text style={styles.txt}>{group.cantidad}</Text>
         <Text style={styles.txt}>{group.total}</Text>
         <Text style={styles.txt}>{group.date}</Text>
         <View style={styles.viewprecio}>
          
         <Text style={styles.precio}>{group.med.precio}</Text>
       
         </View>
         
         </View >
         
          </View>
        );
      })}
        <View style={styles.topbar4}>
          <Text style={styles.txttopbar}>Total:  ${count}</Text>
        </View>
        <View style={styles.topbar5}>
          
          <TouchableOpacity onPress={()=> finalizar()}>
          
            <Image style={styles.imagen1} source={require("../Images/wha.png")}/>  
            <Text style={styles.txttopbar5}>Enviar pedido</Text>

          </TouchableOpacity>
        </View>
    
        
    </ScrollView>
       
       
    </View>

  );
    
    };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCE2F2',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  imagend:{
    width: windowWidth/8,
    height: windowHeight/16,
  },
  btndelete:{
    marginRight: '12%'
  },
  View2:{
    width: windowWidth/1,
    height: windowHeight/10,
    flexDirection: 'row',  
  },
  topbar:{
    width: windowWidth/1,
    height: windowHeight/15,
    backgroundColor: '#082359',
    justifyContent: 'center'
    
  },topbar1:{
    width: windowWidth/1,
    height: windowHeight/12,
    backgroundColor: '#66CDAA',
    flexDirection:'column',
    
  },topbar2:{
    width: windowWidth/3,
    height: windowHeight/12,
    marginLeft:'8%',
    backgroundColor: '#5F9EA0',
    alignSelf:'flex-start',
    borderRadius:10,
    paddingTop:'4%',
    paddingHorizontal: '2%'
  },
  topbar3:{
    width: windowWidth/4,
    height: windowHeight/12,
    marginLeft:'60%',
    alignItems:'center',
    backgroundColor: '#A52A2A',
    borderRadius:10,
    paddingTop:'5%',
    position:'absolute',
  },
  topbar4:{
    width: windowWidth/2,
    height: windowHeight/12,
    marginTop:'3%',
    backgroundColor: '#5F9EA0',
    alignSelf:'center',
    borderRadius:10,
    paddingTop:'4%',
    paddingHorizontal: '2%'
  },
  topbar5:{
    width: windowWidth/1,
    height: windowHeight/10,
    backgroundColor: '#5F9EA0',
    borderRadius:10,
    marginTop:'4%',
    paddingTop:'3%',
    alignContent: 'center',
    paddingHorizontal: '2%',
    flexDirection:'column',
  },
  txttopbar:{
    fontSize: 24,
    alignSelf:'center',
    fontWeight:'bold',
    color: '#FFFFFF'
  },txttopbar2:{
    fontSize: 18,
    alignSelf:'center',
    fontWeight:'bold',
    color: '#FFFFFF'
  },
  txttopbar3:{
    fontSize: 18,
    alignSelf:'center',
    fontWeight:'bold',
    color: '#FFFFFF'
  },
  txttopbar5:{
    fontSize: 22,
    alignSelf:'center',
    fontWeight:'bold',
    color: '#FFFFFF',
    marginTop:'3.6%'
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
    width: windowWidth/2.3,
    height: windowHeight/5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
  ,
  imagenbuscar:{
    width: windowWidth/10,
    height: windowHeight/30,
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
    height: windowHeight/3,
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
    top:'15%',
    position:"relative",
  },
  view1:{
    width: windowWidth/2.8,
    borderRadius: 10,
  },
  viewprecio:{
    borderRadius: 10,
    padding: 1,
    width: windowWidth/4.0,
  },
  LinearGradient:{
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  verprecio:{
    width: windowWidth/10,
    height: windowHeight/20,
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
},
imagen1:{
  width: windowWidth/8,
  height: windowHeight/13,
  padding: '3%',
  marginRight:'5%',
  marginLeft:'2%',
  position: 'absolute',
}
})