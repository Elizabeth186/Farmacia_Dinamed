import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, View, Image, Dimensions, TouchableOpacity, Linking,  onChangeText  } from 'react-native';
import {getAuth} from 'firebase/auth';
import { firebaseConfig } from '../db/firebaseaccesos';
import {initializeApp} from 'firebase/app';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function PerfilAdmin({navigation}) {

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
    height: windowHeight/7.8,
    alignSelf:'center',
    top: 80
  },
  imagen1:{
    width: windowWidth/6,
    height: windowHeight/12,
    alignSelf:'center',
    marginTop: "35%"
  },
  imagen2:{
    width: windowWidth/6,
    height: windowHeight/12,
    alignSelf:'center',
    marginTop: "50%"
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
  textbtn:{
    textAlign: 'center',
    fontSize: 18,
    color:'white',
    padding: 11
  }
  
});