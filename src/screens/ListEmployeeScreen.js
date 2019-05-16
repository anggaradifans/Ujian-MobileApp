import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Header, Content, List, ListItem, Text, Left, Right } from 'native-base';
import {connect} from 'react-redux'
import {Fire} from '../support/firebase'

// const DataDummy = (id,nama,shift) => {
//     return{
//         id : {
//             nama : nama,
//             shift : shift
//         }
//     }
// }

class ListEmployee extends Component {
    state = { data : []}

    componentDidMount(){
      var db = Fire.database()
      var todo = db.ref(`manager/${this.props.user.id}/employee`)

      todo.on('value', (items) => {
          this.setState({data : items.val()})
      }, (err) => {
          console.log(err)
      })
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
              { this.state.data ? Object.keys(this.state.data).map(val => {
                  return <ListItem onPress={() => this.props.navigation.navigate('detail', {
                    id : val,
                    nama : this.state.data[val].nama,
                    shift : this.state.data[val].shift,
                    phone : this.state.data[val].phone
                  })}  >
                            <Left>
                                <Text>{this.state.data[val].nama}</Text>
                            </Left>
                            <Right>
                                <Icon name='chevron-right' size={24}/>
                            </Right>
                        </ListItem>
              }) : null}
          </List>
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

export default connect(mapStateToProps)(ListEmployee)