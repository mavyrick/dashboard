import React, { Component } from 'react';

class TotalUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

  render() {
    return (
      <div className="data-wrapper">
        <div>
          <h1 className="data-title">Total Users</h1>
        </div>
      <div>
        <h1 className="data-total">
          {this.props.userData.users.length}
        </h1>
      </div>
      </div>
    );
  };
}

export default TotalUser;
