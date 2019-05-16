import React, { Component } from 'react';
import {View, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, Title} from 'native-base';
import { connect } from 'react-redux';
import {Fire} from '../support/firebase'
import {onLoginSuccess} from '../2.actions'
import {StackActions, NavigationActions} from 'react-navigation'

class LoginScreen extends Component {

  state = {pass : '', error : '', loading : true}

  componentDidUpdate(){
      if(this.props.user.email){
        const resetAction = StackActions.reset({
          index : 0 ,
          actions : [NavigationActions.navigate({routeName : 'home'})]
        })
        this.props.navigation.dispatch(resetAction)
        this.setState({loading : false})
      }
  }

  
  componentDidMount(){
    Fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.props.onLoginSuccess(user.email, user.uid)
      } else {
        this.setState({loading : false})
      }
    })
  }

  
  
  onBtnLogin = () => {
      if(this.inputEmail && this.state.pass){
          const auth = Fire.auth()
          auth.signInWithEmailAndPassword(this.inputEmail,this.state.pass)
            .then((val) => {
              var {uid,email} = val.user
              this.props.onLoginSuccess(email,uid)
            })
            .catch((err) => {
              console.log(err)
              this.setState({error : err.message})
            })
      } else {
          this.setState({error : 'Data harus diisi'})
      }
  }

  render() {
    if(this.state.loading){
        return(
          <View style={{flex : 1, justifyContent : "center", alignContent : "center"}}>
            <ActivityIndicator size='large' color='black'/>
          </View>
        )
    }
    return (
      <Container>
        <Header>
            <Body>
                <Title style={{marginLeft:15}}>Login</Title>
            </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.inputEmail = text} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText = {(val) => this.setState({pass : val})}/>
            </Item>
          </Form>
          <Button block style={{marginTop:30, marginHorizontal : 15}} onPress={this.onBtnLogin}><Text> Login </Text></Button>
          <View style={{flexDirection:"row", justifyContent:"center", marginTop:30}}>
            <View style={{height : 60, width:60}}>
                <Icon name='facebook'  size={40}/>
            </View>
            <View style={{height : 60, width:60}}>
                <Icon name='google' size={40}></Icon>
            </View>
            <View style={{height : 60, width:60}}>
                <Icon name='twitter' size={40}></Icon>
            </View>
          </View>

          <View style={{flexDirection:'row', justifyContent:"center", marginTop:10}}>
              <Text onPress={() => this.props.navigation.navigate('register')}>Belum Punya akun? Register</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.auth
  }
}

export default connect(mapStateToProps, {onLoginSuccess})(LoginScreen)