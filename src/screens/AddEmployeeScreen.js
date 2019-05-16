import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Input, Label, Picker, Left, Right, Button } from 'native-base';
import {Fire} from '../support/firebase'
import {connect} from 'react-redux'

class AddEmployeeScreen extends Component {
    state = { 
        selected : ''
    }

    onBtnAddEmployee = () => {
        if(this.inputNama && this.phone && this.state.selected){
          const db = Fire.database()
          var manager =  db.ref(`/manager/${this.props.user.id}/employee`)
  
          manager.push({
                nama : this.inputNama,
                phone : this.phone,
                shift : this.state.selected
          })
          .then((res) => {
            alert('New Employee Data Added')
          })
          .catch((err) => {
              console.log(err)
          })
        } else {
          alert('Harus Masukkan Semua data')
        } 
    }


    render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nama</Label>
              <Input onChangeText = {(text) => this.inputNama = text} />
            </Item>
            <Item floatingLabel last>
              <Label>Phone</Label>
              <Input onChangeText = {(text) => this.phone = text} />
            </Item>
            <Item>
                <Left>
                    <Text>Select Day</Text>
                </Left>
                <Right>
                    <Picker 
                        style={{width : 120}} 
                        mode='dropdown'
                        selectedValue={this.state.selected}
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
            <Button block style={{marginTop:30, marginHorizontal : 15}} onPress={this.onBtnAddEmployee} ><Text> Add Employee </Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
      return {
          user : state.auth
      }
}

export default connect(mapStateToProps)(AddEmployeeScreen)