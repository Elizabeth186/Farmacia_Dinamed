import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {isEmpty} from 'lodash';
import { firebaseConfig } from '../db/firebaseaccesos';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import Home from './Home';
import { validadoemail, validandocontraseña, validandoemailpropietario } from '../validaciones/validacion';
import Agregar from './Agregar';
import DetallesProducto from './DetallesProducto';
import Carrito from './Carrito';
import Historial from './Historial';
import TabNav from './Nav';
import Perfil from './Perfil';


import HomeCliente from '../Cliente/HomeCliente';
import DetallesProductoCliente from '../Cliente/DetallesProductoCliente';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const app = initializeApp(firebaseConfig);
const auth= getAuth(app);

function Iniciar(){

  
  const [email, setemail] = useState('');
 const [password, setpassword] =  useState('');
 const [error, setError] = useState(null);

 const navigation = useNavigation();


  const handleSignIn = ()=>{

    if(isEmpty(email) || isEmpty(password) ){
      setError("Existen campos vacios")
    } else if(!validadoemail(email)) {
      setError("Email incorrecto o no registrado")
    } else {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    console.log('Sesion Iniciada!'+email)
    const user = userCredential.user;
    console.log(user);
    navigation.navigate('HomeCliente')
    })
    .catch(error =>{
      console.log(error);
      setError("Usuario no registrado o contraña incorrecta")
    })}
  }

  const handleSignInpro = ()=>{

    if(isEmpty(email) || isEmpty(password) ){
      setError("Existen campos vacios")
    }else if(!validandoemailpropietario(email)){
      setError("Este email no pertenece a un administrador")
    } else {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    console.log('Sesion Iniciada!'+email)
    const user = userCredential.user;
    console.log(user);
    navigation.navigate('Home')
    })
    .catch(error =>{
      console.log(error);
      setError("Usuario no registrado o contraña incorrecta")
    })}
  }

  const handleCreateAccount= ()=>{
    if(isEmpty(email) || isEmpty(password) ){
      setError("Existen campos vacios")
    } else if(!validadoemail(email)) {
      setError("El formato del email es incorrecto")
    }else if(!validandocontraseña(password)){
      setError("contraseña debe contener al entre 8 y 16 caracteres entre ellas mayusculas, minusculas y numeros (no se aceptan simbolos)")
    } else {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    console.log('Cuenta creada!')
    Alert.alert('Tu cuenta ha sido creada '+email)
    const user = userCredential.user;
    console.log(user)})
    .catch(error =>{
      console.log(error)
      setError("Algo salio mal, por favor verifique su informacion")
    })
  }
}
  return(

<View style={styles.container}>
 <SafeAreaView>
        <Image
        style={styles.imagen}
        source={require("../Images/Logo.png")} />
        <Text  style={styles.textstyle}>Correo</Text>
        <TextInput  onChangeText={(text) => setemail(text)} style={styles.inputs} placeholder='Ejemplo@gmail.com'></TextInput>
  
        <Text  style={styles.textstyle}>Contraseña</Text>
        <TextInput   onChangeText={(text) => setpassword(text)} style={styles.inputs} placeholder='*********'></TextInput>
       
       <Text style={styles.texterrorc}>{error}
       </Text>
        <LinearGradient colors={['#368DD9','#082359']} start ={{ x : 1, y : 0 }} style={styles.btnstyle}>
       <TouchableOpacity onPress={handleSignIn}><Text style={styles.textbtn}>Iniciar</Text></TouchableOpacity>

       </LinearGradient>
     
      <Text style={styles.txtnotengo}>¿No posees una cuenta?</Text>

      
      
       <TouchableOpacity onPress={handleCreateAccount}>
       <LinearGradient colors={['#368DD9','#082359']}  start={[0, 0.5]}
                  end={[1, 0.5]} style={styles.btnstyle2}>
                     <View style={styles.circleGradient}>
      <Text style={styles.textbtn2}>Registrarme</Text>
    </View>
                    </LinearGradient></TouchableOpacity>

      
                    <TouchableOpacity onPress={handleSignInpro}>
       <LinearGradient colors={['#368DD9','#082359']}  start={[0, 0.5]}
                  end={[1, 0.5]} style={styles.btnstyle2}>
                     <View style={styles.circleGradient}>
      <Text style={styles.textbtn2}>Iniciar como administrador</Text>
    </View>
                    </LinearGradient></TouchableOpacity>

        </SafeAreaView>
    </View>
  )
}

const Stack =createNativeStackNavigator();

export default function Accesos() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName='Iniciar' screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name='Iniciar' component={Iniciar}/>
      <Stack.Screen name='Home' component={TabNav}/>
      <Stack.Screen name="Agregar" component={Agregar}/>
      <Stack.Screen name="Detalles" component={DetallesProducto}/>
      <Stack.Screen name="Carrito" component={Carrito}/>
      <Stack.Screen name="Perfil" component={Perfil}/>
      <Stack.Screen name="HomeCliente" component={TabNav}/>
      <Stack.Screen name='Detalle' component={DetallesProductoCliente}/>
    </Stack.Navigator>
  </NavigationContainer>
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
  marginTop: '5%',
  marginBottom: '5%',
 
  },
  texterrorc:{
  color: 'red',
  marginTop: '3%',
  textAlign:'justify',
  width: windowWidth/1.7,
  height: windowHeight/13,
  alignSelf: 'center',
  fontStyle:'italic',
  fontSize: 10
  },
  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 8,
    width: windowWidth/1.52,
    height: windowHeight/16,
    top:0.8,
    alignSelf:'center'
  },
  btnstyle2: {
   borderRadius: 10,
   margin: 1,
   width: windowWidth/1.5,
  height: windowHeight/15,
  elevation: 5,
  backgroundColor: 'white',
  alignSelf:'center',
  marginTop: '5%',
  marginBottom: '5%'
  },
  imagen:{
    width: windowWidth/4.5,
    height: windowHeight/10,
    alignSelf:'center',
    top: -15
  },
  inputs:{
    alignSelf:'center',
    marginTop: '2%',
  borderTopColor: 'black',
  borderTopWidth: 0.5,
  width: windowWidth/1.5,
  height: windowHeight/15,
  elevation: 5,
  backgroundColor: 'white',
  borderBottomRightRadius: 10,
  borderTopLeftRadius:10,
  color: 'black',
  textAlign: 'center'
  },
  textstyle:{
    fontSize: 18,
    marginTop: '5%',
    textAlign:'center',
  },
  textbtn:{
    textAlign: 'center',
    fontSize: 18,
    color:'white',
    padding: 11
  },
  textbtn2:{
    textAlign: 'center',
    fontSize: 18,
    color:'#368DD9',
    padding: 11
  },
  txt:{
color:'#368DD9',
fontWeight:'bold',
fontSize:16,
padding:20,
textAlign:'center'
  },
  txtnotengo:{
    textAlign: 'center',
    fontSize: 14,
    marginTop: '5%',
  }
  
});