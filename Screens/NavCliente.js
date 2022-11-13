import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carrito from './Carrito';
import { StyleSheet} from 'react-native';
import Perfil from './Perfil';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HomeCliente from '../Cliente/HomeCliente';

function TabBarIcon({name, color}){
  return(
      <AntDesign size={30} style={{marginBottom: -3}} name={name} color={color}/>
      
  );
}
function TabBarIcon1({name, color}){
  return(
      <MaterialIcons size={30} style={{marginBottom: -3}} name={name} color={color}/>
      
  );
}

const  TabNavc = (props) => {
  const Tab = createBottomTabNavigator(); 
  return (
    <Tab.Navigator  screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: "#082359" },
    tabBarInactiveTintColor: '#fff', tabBarActiveTintColor: '#91e4fb'}}>
      <Tab.Screen name="Inicio" component={HomeCliente} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon name='home' color={color}/>
                ),  headerShown: false}}/>
      <Tab.Screen name="Carrito" component={Carrito} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon name='shoppingcart' color={color}/>
                ),  headerShown: false}}/>
      <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon1 name='person' color={color}/>
                ),  headerShown: false}}/>
    </Tab.Navigator>
  );  
}

export default TabNavc



const styles = StyleSheet.create({
 
 
});