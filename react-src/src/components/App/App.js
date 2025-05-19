import React, { Component } from 'react';
import axios from 'axios';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';
import { Button } from 'semantic-ui-react';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';

    this.state = {
      users: [],
      open: false,
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`${this.server}/api/users/`)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    
    let i = users.findIndex(u => u._id === user._id)

    if (users.length > i) { users[i] = user }

    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  handleModal() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <h1 id='App-intro'>PLA - Materiales KTM</h1>
          </div>
        </div>
        <div className='App-Body'>
          <Button color={this.props.buttonColor} onClick={() => this.handleModal()}>{this.props.buttonTriggerTitle}</Button>
          <ModalUser
            headerTitle='Crear Nuevo Producto'
            buttonTriggerTitle='Crear Producto'
            buttonSubmitTitle='Crear'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
            server={this.server}
            open={this.state.open}
            handleModal
          />
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
          />
        </div>
        <br />
      </div>
    );
  }
}

export default App;
