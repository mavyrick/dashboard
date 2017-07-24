import React, { Component } from 'react';

class Cart extends Component {

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
          <h1 className="data-title">Total Carts</h1>
        </div>
      <div>
        <h1 className="data-total">
          {this.props.cartData.carts}
        </h1>
      </div>
      </div>
    );
  };
}

export default Cart;
