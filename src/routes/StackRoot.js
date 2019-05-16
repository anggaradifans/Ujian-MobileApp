import React,{Component} from 'react'

import {createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import LoginScreen from '../screens/LoginScreen';
import RegisterPage from '../screens/RegisterPage';
import EmployeeDetail from '../screens/EmployeeDetailScreen';
import MenuAccountSetting from '../screens/MenuAccountSetting'
import EditEmployee from '../screens/EditEmployeeScreen';
import Menu from '../screens/MenuStack';
import AddEmployee from '../screens/AddEmployeeScreen';
import List from '../screens/ListEmployeeScreen'


const StackBeranda = createStackNavigator({
    MenuStack : Menu,
    add : AddEmployee,
    edit : EditEmployee,
    list : List,
    detail : EmployeeDetail
}, {
    headerMode : 'none',
})

StackBeranda.navigationOptions = ({navigation}) => {
    let tabBarVisible = false

    let routeName = navigation.state.routes[navigation.state.index].routeName
    if(routeName == 'MenuStack'){
        tabBarVisible = true
    }

    return {
        tabBarVisible
    }
}


const AccountSetting = createStackNavigator({
    menu : MenuAccountSetting
    
}) 

const HomeTab = createMaterialTopTabNavigator({
    Home : StackBeranda,
    Account : AccountSetting
}, {
    tabBarPosition : "bottom",
    swipeEnabled : false
})

const StackRoot = createStackNavigator({
    login : LoginScreen,
    home : HomeTab,
    register : RegisterPage,

},{
    headerMode : 'none',
})

export const StackContainer = createAppContainer(StackRoot)

