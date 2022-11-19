import { StatusBar } from 'expo-status-bar';

import { getAuth, updateProfile } from "firebase/auth";
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    Dimensions
  } from "react-native";
  import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Usuario({navigation}) {

    
      const [text, setText] = useState('');

    

      const saveUserName = async () => {
        //validaciones
          if (text === "") {
            alert("Por favor ingrese nombre de farnacia");
          } else{
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              displayName: text
            }).then(()=>
                alert('Su farmacia ha sido guardada con exito')
           )}
      
        };
        /*navigation.navigate("Inicio")*/

  return (

        <View style={styles.container}>
          <SafeAreaView>
        <Text style={styles.txt} >Ingrese nombre de farmacia:</Text>
        <TextInput 
      style={styles.input} 
      placeholder="Nombre de farmacia"
      onChangeText={setText}
      value={text}/>
      <TouchableOpacity style={styles.btn} onPress={() => saveUserName()}>
     
     <Text style={styles.txtbtnagregar}>Guardar</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate("Inicio")}>
     
     <Text style={styles.txtbtnagregar1}>Regresar</Text>
     </TouchableOpacity>
     </SafeAreaView>
            </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      alignContent:'center'
    
    },txtbtnagregar:{
      fontSize: 18,
      textAlign:'center'
    },txtbtnagregar1:{
      fontSize: 18,
      color:'white',
      textAlign:'center'
    },
    btn:{
      backgroundColor:'#DCE2F2',
      margin: '2%',
      width: windowWidth/1.5,
      height: windowHeight/20,
      borderRadius: 12,
      borderColor:'#082359',
      borderWidth:2,
      justifyContent:'center'
    },
    btn1:{
      backgroundColor: '#368DD9',
      margin: '2%',
      width: windowWidth/1.5,
      height: windowHeight/20,
      borderRadius: 12,
      borderColor:'#082359',
      borderWidth:2,
      justifyContent:'center'
    },
    input:{
      width: windowWidth/1.5,
      height: windowHeight/20,
      borderRadius: 10,
      borderColor:'#082359',
      borderWidth:1,
      marginLeft:'2%',
      marginBottom:'3%',
      justifyContent:'center',
      textAlign:'center'
    },
    txt:{
      fontSize: 20,
      color:'#082359',
      margin: '5%',
      fontWeight:'bold'
    }
  });
  