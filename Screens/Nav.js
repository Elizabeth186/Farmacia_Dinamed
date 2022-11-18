import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Pedidos from './Pedidos';
import Home from '../Screens/Home';
import { StyleSheet} from 'react-native';
import Perfil from './Perfil';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Historial from './Historial';
import PerfilAdmin from './PerfilAdmin';

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
      {/* <Tab.Screen name="Pedidos" component={Pedidos} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon1 name='history-toggle-off' color={color}/>
                ),  headerShown: false}}/> */}
      <Tab.Screen name="PerfilAdmin" component={PerfilAdmin} options={{ tabBarIcon: ({color}) =>(
                    <TabBarIcon1 name='person' color={color}/>
                ),  headerShown: false}}/>
    </Tab.Navigator>
  );  
}

export default TabNav

const styles = StyleSheet.create({ 
});