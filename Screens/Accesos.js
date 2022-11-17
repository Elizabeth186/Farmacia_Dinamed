import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {isEmpty} from 'lodash';
import { firebaseConfig } from '../db/firebaseaccesos';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import { validadoemail, validandocontraseña, validandoemailpropietario } from '../validaciones/validacion';
import Agregar from './Agregar';
import DetallesProducto from './DetallesProducto';
import Carrito from '../Cliente/Carrito';
import Historial from './Historial';
import TabNav from './Nav';
import Perfil from './Perfil';
import DetallesProductoCliente from '../Cliente/DetallesProductoCliente';
import TabNavc from './NavCliente';
import CarritoDetalle from '../Cliente/CarritoDetalle';
import Usuario from "./Usuario";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const app = initializeApp(firebaseConfig);
const auth= getAuth(app);

function Iniciar(){

//hooks    
const [email, setemail] = useState('');
const [password, setpassword] =  useState('');
const [error, setError] = useState(null);

 const navigation = useNavigation();

//Inciar sesion
const handleSignIn = ()=>{

    //validaciones
    if(isEmpty(email) || isEmpty(password) ){
      setError("Existen campos vacios")
    } else if(!validadoemail(email)) {
      setError("Email incorrecto o no registrado")
      //validacion de email de propietario
    } else if(validandoemailpropietario(email)){
      //se ejecuta al encontrar la coincidencia con el email del propietario
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
      }) 
    }
     else {
      //Inicio de sesion para clientes
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    console.log('Sesion Iniciada!'+email)
    const user = userCredential.user;
    console.log(user);
    navigation.navigate('usuario')
    })
    .catch(error =>{
      console.log(error);
      setError("Usuario no registrado o contraña incorrecta")
    })
  }
  }

  //crear cuenta
  const handleCreateAccount= ()=>{
  //validaciones
    if(isEmpty(email) || isEmpty(password) || isEmpty(password) ){
      setError("Existen campos vacios")
    } else if(!validadoemail(email)) {
      setError("El formato del email es incorrecto")
    }else if(!validandocontraseña(password)){
      setError("contraseña debe contener al entre 8 y 16 caracteres entre ellas mayusculas, minusculas y numeros (no se aceptan simbolos)")
    } else {
  //creaion de cuenta
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
        </SafeAreaView>
    </View>
  )
}

const Stack =createNativeStackNavigator();

export default function Accesos() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName='Iniciar' >
      <Stack.Screen  options={{headerStyle: {backgroundColor: '#0D0D0D'}, headerShown: false}} name='Iniciar' component={Iniciar}/>
      <Stack.Screen  options={{headerShown: false}} name='Home' component={TabNav}/>
      <Stack.Screen options={{headerTitleAlign: 'center',headerStyle: {backgroundColor: '#082359'},
                    headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},title: 'Agregar un nuevo producto'}}
                    name="Agregar" component={Agregar}/>
      <Stack.Screen options={{headerTitleAlign: 'center',headerStyle: {backgroundColor: '#082359'},
                    headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},title: 'Detalles del producto'}}
                     name="Detalles" component={DetallesProducto}/>
      <Stack.Screen options={{headerTitleAlign: 'center',headerStyle: {backgroundColor: '#082359'},
                    headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'}}}
                    name="Perfil" component={Perfil}/>
      <Stack.Screen   options={{headerShown: false}} name="Inicio" component={TabNavc}/>
      <Stack.Screen options={{headerTitleAlign: 'center',headerStyle: {backgroundColor: '#082359'},
                    headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},title: 'Detalles del producto'}}
                    name='Detalle' component={DetallesProductoCliente}/>
                    <Stack.Screen options={{headerTitleAlign: 'center',headerStyle: {backgroundColor: '#082359'},
                    headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},title: 'Detalles del producto'}}
                    name='DetalleCarrito' component={CarritoDetalle}/>
                    <Stack.Screen options={{headerTitleAlign: 'center',headerStyle: {backgroundColor: '#082359'},
                    headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},title: 'Detalles del producto'}}
                    name='usuario' component={Usuario}/>
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#DCE2F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  btnstyle: {
   borderRadius: 10,
   width: windowWidth/1.1,
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
    width: windowWidth/1.11,
    height: windowHeight/16,
    top:0.8,
    alignSelf:'center'
  },
  btnstyle2: {
   borderRadius: 10,
   margin: 1,
   width: windowWidth/1.1,
  height: windowHeight/15,
  elevation: 5,
  backgroundColor: 'white',
  alignSelf:'center',
  marginTop: '5%',
  marginBottom: '5%'
  },
  imagen:{
    width: windowWidth/4,
    height: windowHeight/10,
    alignSelf:'center',
    top: "-10%"
  },
  inputs:{
    alignSelf:'center',
    marginTop: '2%',
  borderColor: 'black',
  borderWidth: 0.5,
  width: windowWidth/1.1,
  height: windowHeight/15,
  elevation: 5,
  backgroundColor: 'white',
  borderBottomRightRadius: 10,
  borderTopLeftRadius:10,
  color: 'black',
  textAlign: 'center'
  },
  textstyle:{
    color:"#696969",
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