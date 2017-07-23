import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import NetCentsImg from './netcents.png';
import {Line as LineChart} from 'react-chartjs';
import Chart from 'chart.js';
require("bootstrap/less/bootstrap.less");

var chartData = {
    title: "Test",
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fill: true,
            pointHoverRadius: 5,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
            fillColor: "lightsteelblue",
        }
    ],
};

var chartOptions = {
  //Boolean - Show a backdrop to the scale label
      scaleShowLabelBackdrop : true,

      //String - The colour of the label backdrop
      scaleBackdropColor : "rgba(255,255,255,0.75)",

      // Boolean - Whether the scale should begin at zero
      // scaleBeginAtZero : true,

      //Number - The backdrop padding above & below the label in pixels
      scaleBackdropPaddingY : 2,

      //Number - The backdrop padding to the side of the label in pixels
      scaleBackdropPaddingX : 2,

      //Boolean - Show line for each value in the scale
      scaleShowLine : true,

      //Boolean - Stroke a line around each segment in the chart
      segmentShowStroke : true,

      //String - The colour of the stroke on each segement.
      segmentStrokeColor : "#fff",

      //Number - The width of the stroke value in pixels
      segmentStrokeWidth : 2,

      //Number - Amount of animation steps
      // animationSteps : 100,

      //String - Animation easing effect.
      // animationEasing : "linear",

      //Boolean - Whether to animate the rotation of the chart
      // animateRotate : true,

      //Boolean - Whether to animate scaling the chart from the centre
      // animateScale : false,

      //String - A legend template
      // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  }

var perPage = 10
var url = 'http://localhost:3000/'

class App extends Component {
  constructor(props) {
    super(props);
      this.handleAddUser = this.handleAddUser.bind(this);
      this.handleAddOrder = this.handleAddOrder.bind(this);
      this.handleAddCart = this.handleAddCart.bind(this);
      this.getUserData = this.getUserData.bind(this);
      this.getOrderData = this.getOrderData.bind(this);
      this.getCartData = this.getCartData.bind(this);
      this.state = {
        userData: [],
        orderData: [],
        cartData: [],
        signUpList: [],
        totalUsers: [],
        amountDeposit: [],
        totalProcessed: [],
        chartData: ['test'],
        chartOptions: ['test'],
        amountPrice: [],
        newClients: [],
        }
      }

  getUserData() {
    var access = this
    axios.get('http://localhost:5000/api/v1/dashboard/users/')
      .then(function(response) {
      access.setState({userData: response.data})
    });
  }

  getOrderData() {
    var access = this
    axios.get('http://localhost:5000/api/v1/dashboard/orders/')
      .then(function(response) {
      access.setState({orderData: response.data})
    });
  }

  getCartData() {
    var access = this
    axios.get('http://localhost:5000/api/v1/dashboard/carts/')
      .then(function(response) {
      access.setState({cartData: response.data})
    });
  }

  renderTotalUserData(userData) {
    if(userData.users) {
            return(
          <div>
          <TotalUser userData={userData} />
          </div>
        )
    } else {
      return (<div></div>)
    }
  }

  renderOrderData(orderData) {
            return(
          <div>
          <Order orderData={orderData} />
        </div>
      )
    }

  renderCartData(cartData) {
            return(
          <div>
          <Cart cartData={cartData} />
          </div>
        )
  }

  renderUserData(userData) {
    if(userData.users) {
      return this.state.userData.users.map((userData) => {
        return(
          <tr>
            <User userData={userData} />
          </tr>
        )
      });
    } else {
      return (<tr></tr>)
    }
  }

// renderChartData(chartData) {
//   React.createclass({
//     render() {
//     return(
//       <div>
//         <LineChart data={chartData} width="600" height="250"/>
//       </div>
//     );
//   }
//   });
// }

// var MyComponent = React.createClass({
//   render: function() {
//     return <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
//   }
// });

  componentWillMount() {
    this.getUserData()
    this.getOrderData()
    this.getCartData()
  }

  // componentDidMount() {
  //   setInterval(function() {
  //     this.getUserData;
  //     this.getOrderData;
  //   }, 1000)
  // }

  componentDidMount() {
    setInterval(this.getUserData, 1000);
    setInterval(this.getOrderData, 1000);
    setInterval(this.getCartData, 1000);
  }

  handleAddUser(user) {
    this.setState({userData: [...this.state.userData, user]});
  }

  handleAddOrder(order) {
    this.setState({orderData: [...this.state.orderData, order]});
  }

  handleAddCart(cart) {
    this.setState({cartData: [...this.state.carts, cart]});
  }

  render() {
    return (
        <div id="wrapper">
        <center><img src={NetCentsImg} id="netcents-image"/></center>
            <center><div className="container" id="dashboard-container">
              <div className="row">
              <div className="col-sm-3">
              <h1 className="data-title">Sign-up List</h1>
              <table className="table table-condensed table-bordered" id="data-table">
                <tbody>
                <tr>
                  </tr>
                  {this.renderUserData(this.state.userData)}
                </tbody>
              </table>
              </div>
                <div className="col-sm-6">
                  {this.renderOrderData(this.state.orderData)}
                </div>
                <div className="col-sm-3">
                {this.renderCartData(this.state.cartData)}
                </div>
              </div>
              <div className="row">
              <div className="col-sm-3">
                {this.renderTotalUserData(this.state.userData)}
              </div>
                <center><div className="col-sm-6">
              {/* <label for = "LineChart" id="chart-label">
                  NetCents Chart
                  </label> */}
                  <LineChart data={chartData} options={chartOptions} width="475" height="200"/>
                </div></center>
                <div className="col-sm-3">
                <h1 className="data-title">New Clients</h1>
                <table className="table table-condensed table-bordered" id="data-table">
                  <tbody>
                    <tr>
                    </tr>
                    {this.renderUserData(this.state.userData)}
                  </tbody>
                </table>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  {this.renderTotalUserData(this.state.userData)}
                </div>
                <div className="col-sm-6">
                  {this.renderOrderData(this.state.orderData)}
                </div>
                <div className="col-sm-3">
                {this.renderCartData(this.state.cartData)}
                </div>
              </div>
              <div className="row">
                <h1 id="revenue">Total Revenue: 1.55k</h1>
                </div>
        </div>
        </center>
        </div>
    )
  }
}

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
          {this.props.userData.email}
        </td>
      );
    };
  }

export default App;
