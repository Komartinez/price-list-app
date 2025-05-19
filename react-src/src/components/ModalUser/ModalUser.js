import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';

class ModalUser extends Component {

  render() {
    console.log(this.props.handleModal)
    return (
        <Modal
          open={this.props.open}
          dimmer='inverted'
          size='mini'
          closeIcon='close'
        >
          <Modal.Header>{this.props.headerTitle}</Modal.Header>
          <Modal.Content>
            <FormUser
              buttonSubmitTitle={this.props.buttonSubmitTitle}
              buttonColor={this.props.buttonColor}
              userID={this.props.userID}
              onUserAdded={this.props.onUserAdded}
              onUserUpdated={this.props.onUserUpdated}
              server={this.props.server}
              open={this.props.open}
            />
          </Modal.Content>
        </Modal>
    );
  }
}

export default ModalUser;
