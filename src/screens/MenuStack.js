import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import {connect} from 'react-redux'


class Menu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{alignSelf : "center"}}>Welcome to Manager Apps</Text>
                <Text style={{alignSelf : "center"}}>Id : {this.props.user.email}</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:100, marginHorizontal:20}}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('add')} style={{height : 100, width : 100 , borderWidth : 3, borderColor : "orange" ,backgroundColor : 'orange', justifyContent : "center"}}>
                        <Text style={{alignSelf : "center", color : 'white'}}>Add</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('edit')} style={{height : 100, width : 100 , borderWidth : 3, borderColor : "orange" ,backgroundColor : 'orange', justifyContent : "center"}}>
                        <Text style={{alignSelf : "center", color : 'white'}}>Edit</Text>                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('list')} style={{height : 100, width : 100 , borderWidth : 3, borderColor : "orange" ,backgroundColor : 'orange', justifyContent : "center"}}>
                        <Text style={{alignSelf : "center", color : 'white'}}>List</Text>                    
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.auth
    }
}

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});