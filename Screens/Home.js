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
      const { nombre, descripcion, precio } = doc.data();
      meds.push({
        id: doc.id,
        nombre,
        descripcion,
        precio
      });
    });
    setMeds(meds);
  });
}, []);




  return (
    <ScrollView >
      <Button
        style={styles.btn}
        onPress={() => props.navigation.navigate("Agregar")}
        title="Agregar item"
      />
      
    {meds.map((medis) => {
      return (

        <ListItem
          key={medis.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("Detalles", {
              listId: medis.id,
            });
          }}
          >
          <ListItem.Chevron />
          <Avatar
          style={styles.pantall}
            source={{
              uri:'https://thumbs.dreamstime.com/z/vector-fast-food-composition-white-background-197380349.jpg'
            }}

           />
          <Text>Hola</Text>
          <ListItem.Content >
            <ListItem.Title >{medis.nombre}</ListItem.Title>
            <ListItem.Subtitle>{medis.descripcion}</ListItem.Subtitle>
            <ListItem.Subtitle>{medis.precio}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        
      );
    })}
  </ScrollView>
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
