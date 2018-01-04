import React, { Component } from 'react';
import logo from './logo.svg';
import {Menu} from 'antd';
import './App.css';
import {Routes} from './Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu theme="dark">
          <Menu.Item>
            Sistema de Administración
          </Menu.Item>
        </Menu>
        <Routes/>
      </div>
    );
  }
}

export default App;
