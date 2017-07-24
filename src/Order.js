import React, { Component } from 'react';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="data-wrapper">
        <div>
          <h1 className="data-title">Total Orders</h1>
        </div>
      <div>
        <h1 className="data-total">
          {this.props.orderData.orders}
        </h1>
      </div>
      </div>
    );
  };
}

export default Order;
