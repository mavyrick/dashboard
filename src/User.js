import React, { Component } from 'react';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

  render() {
    return (
      <td>
        <h4 id="table-text">{this.props.userData.email}</h4>
      </td>
    );
  };
}

export default User;
