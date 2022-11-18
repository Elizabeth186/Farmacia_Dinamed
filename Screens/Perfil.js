import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, View, Image, Dimensions, TouchableOpacity, Linking,  onChangeText  } from 'react-native';
import {getAuth} from 'firebase/auth';
import { firebaseConfig } from '../db/firebaseaccesos';
import {initializeApp} from 'firebase/app';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Perfil({navigation}) {

  const [text, onChangeText] = React.useState("Ponga su mensaje aca");

  const app = initializeApp(firebaseConfig);
  const auth= getAuth(app);
  let url = "whatsapp://send?text=" + text + "&phone=50372298350"
  const SignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Iniciar")
      })
      .catch(error => alert(error.message))
  }
  return (
    
    <View>
      <SafeAreaView>
      <Image style={styles.imagen} source={require("../Images/Logo.png")}/>
        <TouchableOpacity onPress={() => navigation.navigate("usuario")}
        title="Poseo dudas con rspecto a mi pedido">
            <Image style={styles.imagen11} source={require("../Images/userpr.png")}/>  
            <Text style={styles.textstyle1}>Cambiar/Insertar nombre de farmacia</Text>        
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=> Linking.openURL(url)}
      title="Poseo dudas con rspecto a mi pedido">
          <Image style={styles.imagen1} source={require("../Images/wha.png")}/>          
        </TouchableOpacity>
        <Text style={styles.textstyle}>Contactanos</Text>
        <TouchableOpacity onPress={SignOut}>
          <Image style={styles.imagen2} source={require("../Images/logout.png")}/>
        </TouchableOpacity>
        <Text style={styles.textstyle}>Cerrar sesion</Text>
        </SafeAreaView>
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
   height: windowHeight/18,
  elevation: 5,
  alignSelf:'center',
  marginTop: '15%',
  marginBottom: '10%'
  },
  imagen:{
    width: windowWidth/3,
    height: windowHeight/6.8,
    alignSelf:'center',
    top: 80
  },
  imagen11:{
    width: windowWidth/6,
    height: windowHeight/12,
    alignSelf:'center',
    marginTop: "30%",
    marginBottom:'0%'
  },
  imagen1:{
    width: windowWidth/6,
    height: windowHeight/12,
    alignSelf:'center',
    marginBottom:'%'
  },
  imagen2:{
    width: windowWidth/6,
    height: windowHeight/12,
    alignSelf:'center',
    marginTop: "10%"
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
    fontSize: 14,
    marginTop: '5%',
    alignSelf:'center',
  },
  textstyle1:{
    textAlign: 'left',
    fontSize: 14,
    marginTop: '5%',
    marginBottom: '7%',
    alignSelf:'center',
  },
  textbtn:{
    textAlign: 'center',
    fontSize: 18,
    color:'white',
    padding: 11
  }
  
});