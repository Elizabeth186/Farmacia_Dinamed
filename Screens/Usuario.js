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
        <Text>Ingrese nombre de farmacia:</Text>
        <TextInput 
      style={styles.input} 
      placeholder="Nombre de farmacia"
      onChangeText={setText}
      value={text}/>
      <TouchableOpacity style={styles.txtbtnagregar} onPress={() => saveUserName()}>
     
     <Text style={styles.txtbtnagregar}>Guardar</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.txtbtnagregar1} onPress={() => navigation.navigate("Inicio")}>
     
     <Text style={styles.txtbtnagregar1}>Regresar</Text>
     </TouchableOpacity>
            </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },txtbtnagregar:{
      marginTop: 30
    },txtbtnagregar1:{
      marginTop: 30
    }
  });
  