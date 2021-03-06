import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import NetCentsImg from './netcents.png';
import {Line as LineChart} from 'react-chartjs-2';
import Chart from 'chart.js';
import TotalUser from './TotalUser.js';
import Order from './Order.js';
import User from './User.js';
import Cart from './Cart.js';
import Revenue from './Revenue.js';
require("bootstrap/less/bootstrap.less");

const username = window.prompt("Enter username:")
const password = window.prompt("Enter password:")

const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            fill: true,
            pointHoverRadius: 5,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
            fillColor: "lightblue",
            backgroundColor: "lightgrey",
            borderColor: 'steelblue',
        }
    ],
};

const chartOptions = {
title: {
        display: true,
        text: 'Chart',
        fontSize: 25,
        fontColor: 'black',
        position: 'top',
    },
    pointDot : false,
    maintainAspectRatio: false,
    responsive: false,
    legend: {
       display: false
     },
     tooltips: {
       enabled: false
    },
    scales: {
        yAxes: [{
            ticks: {
                fontColor: 'black',
                fontStyle: 'bold',
            },
            gridLines: {
            },
        }],
      xAxes: [{
          ticks: {
              fontColor: 'black',
              fontStyle: 'bold'
          },
          gridLines: {
            display: false,
          },
      }]
  }
}

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
        amountPrice: [],
        newClients: [],
        }
      }

  getUserData() {
    var access = this
    axios.get('http://localhost:5000/api/v1/dashboard/users/', {auth: {username: username, password: password}})
      .then(function(response) {
      access.setState({userData: response.data})
    });
  }

  getOrderData() {
    var access = this
    axios.get('http://localhost:5000/api/v1/dashboard/orders/', {auth: {username: username, password: password}})
      .then(function(response) {
      access.setState({orderData: response.data})
    });
  }

  getCartData() {
    var access = this
    axios.get('http://localhost:5000/api/v1/dashboard/carts/', {auth: {username: username, password: password}})
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

  renderRevenueData(cartData) {
            return(
          <div>
          <Revenue cartData={cartData} />
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

  componentWillMount() {
    this.getUserData()
    this.getOrderData()
    this.getCartData()
  }

  componentDidMount() {
    setInterval(function() {
      this.getUserData;
      this.getOrderData;
    }, 1000)
  }

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
              <table id="data-table">
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
                <div id="line-chart">
                  <LineChart ref="chart" data={chartData} options={chartOptions} width="435" height="225"/>
                  </div>
                </div></center>
                <div className="col-sm-3">
                <h1 className="data-title">New Clients</h1>
                <table id="data-table">
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
                  {this.renderRevenueData(this.state.orderData)}
                </div>
                <div className="col-sm-3">
                {this.renderCartData(this.state.cartData)}
                </div>
              </div>
        </div>
        </center>
        </div>
    )
  }
}

export default App;
