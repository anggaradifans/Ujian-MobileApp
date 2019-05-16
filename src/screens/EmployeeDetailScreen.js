import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableOpacity
} from "react-native";
import Communications from 'react-native-communications'
import {connect} from 'react-redux'
import { Fire } from '../support/firebase'

class EmployeeDetail extends Component {

    state = {
        id : null
    }

    componentDidMount(){
        this.setState({id : this.props.navigation.getParam('id')})
    }

    onBtnDelete = () => {
        Alert.alert('Delete Data', 'Are You Sure to Delete ' + this.props.navigation.getParam('nama'), [
            {text : 'Yes', onPress: () => Fire.database().ref(`/manager/${this.props.user.id}/employee`).child(this.state.id).remove()
            .then((val) => {
                this.props.navigation.navigate('list')
                console.log(val)
            })
            .catch((err) => console.log(err))
            }, {text : 'Cancel'}
        ])
    
    }
    
    render() {
        const {getParam} = this.props.navigation
        return (
            <View style={styles.container}>
                <Text>{getParam('id')}</Text>
                <Text>{getParam('nama')}</Text>
                <Text>{getParam('shift')}</Text>
                <Text>{getParam('phone')}</Text>
                <Button title='Delete' onPress={this.onBtnDelete}/>
                <TouchableOpacity onPress={() => Communications.textWithoutEncoding(getParam('phone'), `Hello ${getParam('nama')}, Your upcoming shift is on ${getParam('shift')}`)}>
                    <View style={styles.holder}>
                        <Text style={styles.text}>Send a text/iMessage</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.auth
    }
}


export default connect(mapStateToProps)(EmployeeDetail);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});















//MAP

// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Button
// } from "react-native";
// import MapView, {Marker} from 'react-native-maps'

// class Pemesanan extends Component {

//     state = {
//         location : null
//     }

//     onBtnclick = () => {
//         navigator.geolocation.getCurrentPosition(a => {
//             console.log(a)
//             this.setState({location : {
//                 latitude : a.coords.latitude,
//                 longitude : a.coords.longitude,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121,

//             }})
//         }, err => {
//             console.log(err)
//         })
//     }
//     render() {
//         console.disableYellowBox = true
//         const initial = {
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//         }
//         const obj = this.state.location ? this.state.location : initial
//         return (
//             <View style={styles.container}>
//                 <View style={{marginTop : 30 , zIndex: 1}}>
//                 <Button title='Get Current Location' onPress={this.onBtnclick} />
//                 </View>
//                 <MapView style={styles.map}
//                 region={obj}
//                 >

//                     <Marker coordinate={obj}/>
//                 </MapView>
//             </View>
//         );
//     }
// }
// export default Pemesanan;

// const styles = StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       flex : 1
//     },
//     map: {
//       ...StyleSheet.absoluteFillObject,
//     },
//    });