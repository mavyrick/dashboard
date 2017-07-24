import React, { Component } from 'react';

class Revenue extends Component {

constructor(props) {
  super(props);
  this.state = {
    cartData: []
  };
}

render() {
  return (
    <div className="data-wrapper">
      <div>
        <h1 id="revenue-title">Revenue</h1>
      </div>
    <div>
      <h1 id="revenue-total">
        $2,500,000
      </h1>
    </div>
    </div>
  );
};
}

export default Revenue;
