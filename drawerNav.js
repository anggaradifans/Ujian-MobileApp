// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Image
// } from "react-native";

// import HomeScreen from './src/screens/HomeScreen'
// import LoginScreen from './src/screens/LoginScreen'
// import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'

// const CustomDrawer = (props) => {
//     return(
//         <View style={{flex:1}}>
//             <View>
//                 <Image style={{height:40, width:40}} source={{uri: 'https://pickaface.net/gallery/avatar/unr_avatarmaker_170617_1718_7l3z1pvy.png'}}></Image>
//             </View>
//             <DrawerItems {...props}/>
//         </View>
//     )
// }

// const Drawer = createDrawerNavigator({
//     home : HomeScreen,
//     login : LoginScreen
// }, {
//     contentComponent : CustomDrawer
// })

// const DrawerContainer = createAppContainer(Drawer)
// class Hello extends Component {
//     render() {
//         return (
//             <DrawerContainer/>
//         );
//     }
// }
// export default Hello;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });