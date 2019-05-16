import React, { Component } from 'react';
import {View} from 'react-native'
import { Text, Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right, Button } from 'native-base';
import {Fire} from '../support/firebase'
import {connect} from 'react-redux'

class EditEmployee extends Component {
    state = { 
        selected : '', data : [] , idEdit : null   
    }

    componentDidMount(){
      var db = Fire.database()
      var manager = db.ref(`manager/${this.props.user.id}/employee`)

      manager.on('value', (items) => {
          this.setState({data : items.val()})
      }, (err) => {
          console.log(err)
      })
    }

    onBtnSave = () => {
      if(this.editNama){
        var nama = this.editNama
      } else {
        var nama = this.state.data[this.state.idEdit].nama
      }

      if(this.editPhone){
        var phone = this.editPhone
      } else {
        var phone = this.state.data[this.state.idEdit].phone
      }

      var db = Fire.database()
      var manager = db.ref(`manager/${this.props.user.id}/employee/${this.state.idEdit}`)

      manager.set({
          nama : nama,
          phone : phone,
          shift : this.state.selected
      })
      .then((val) => {
          console.log(val)
          alert('Data berhasil diedit')
      })
      .catch((err) => console.log(err))
    
    }

  render() {
    if(this.state.data){
      return (
        <Container>
          <Header />
          <Content>
            <View style={{flexDirection:"row", justifyContent : "space-between"}}>
              <View style={{paddingTop : 15, paddingLeft : 15}}>
                 <Label> Select Data </Label> 
              </View>
              <View>
                  <Picker mode ='dropdown' 
                  style={{width:200}} 
                  selectedValue={this.state.idEdit}
                  onValueChange={(val) => this.setState({idEdit : val})}>
                      <Picker.Item label='Select Name' value={0}/>  
                      {
                          Object.keys(this.state.data).map(val => {
                              return(
                                  <Picker.Item label={this.state.data[val].nama} value={val}/>
                              )
                          })
                      }
                  </Picker>
              </View>    
            </View>  
            <Form>
              <Item stackedLabel>
                <Label>Nama</Label>
                <Input onChangeText={(text) => this.editNama = text} defaultValue={this.state.idEdit ? this.state.data[this.state.idEdit].nama : null}/>
              </Item>
              <Item stackedLabel>
                <Label>Phone</Label>
                <Input onChangeText={(text) => this.editPhone = text} defaultValue={this.state.idEdit ? this.state.data[this.state.idEdit].phone : null} />
              </Item>
              <Item>
                  <Left>
                      <Text>Select Day</Text>
                  </Left>
                  <Right>
                      <Picker 
                          style={{width : 120}} 
                          mode='dropdown'
                          selectedValue={ (this.state.idEdit && this.state.selected) ? this.state.selected : (this.state.idEdit && this.state.selected == '') ? this.state.data[this.state.idEdit].shift : null}
                          onValueChange={(value) => this.setState({selected : value})}>
                          <Picker.Item label='Monday' value='Mon'/>
                          <Picker.Item label='Tuesday' value='Tue'/>
                          <Picker.Item label='Wednesday' value='Wed'/>
                          <Picker.Item label='Thursday' value='Thu'/>
                          <Picker.Item label='Friday' value='Fri'/>
                          <Picker.Item label='Saturday' value='Sat'/>
                          <Picker.Item label='Sunday' value='Sun'/>
                      </Picker>
                  </Right>
              </Item>
              <Button block style={{marginTop:30, marginHorizontal : 15}} onPress={this.onBtnSave} ><Text> Save </Text></Button>
            </Form>
          </Content>
        </Container>
      );
    } else {
      return <Text>Belum Ada Data yang Diedit</Text>
    }
   
  }
}

const mapStateToProps = (state) => {
    return {
      user : state.auth
    }
}

export default connect(mapStateToProps)(EditEmployee)