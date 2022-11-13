import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carrito from '../Screens/Carrito';
import Home from '../Screens/Home';
import { StyleSheet} from 'react-native';
import Perfil from './Perfil';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Historial from './Historial';

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

const  TabNav = (props) => {
  const Tab = createBottomTabNavigator(); 
  return (
    <Tab.Navigator  screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: "#082359" },
    tabBarInactiveTintColor: '#fff', tabBarActiveTintColor: '#91e4fb'}}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon name='home' color={color}/>
                ),  headerShown: false}}/>
      <Tab.Screen name="Historial" component={Historial} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon1 name='history-toggle-off' color={color}/>
                ),  headerShown: false}}/>
      <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon1 name='person' color={color}/>
                ),  headerShown: false}}/>
    </Tab.Navigator>
  );  
}

export default TabNav

const styles = StyleSheet.create({ 
});