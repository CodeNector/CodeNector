import React from "react";
import { Link } from 'react-router-dom';

var headerStyle = {
    'margin-left': 10+"px",
    'margin-right': 10+"px",
    'float': "right"
}

var navbarContainerStyle = {
    'width': 100+'%',
}

var logoutStyle = {
    'float': "right"
}

const Nav = props =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div style={navbarContainerStyle} className="navbar-header">
        <div style={logoutStyle}><Link to='/logout'> Logout </Link></div>
        <div style={headerStyle}><Link to='/login'> Login </Link></div>
        <div style={headerStyle}><Link to='/register'> Need an account? </Link></div>
      </div>
    </div>
  </nav>;

export default Nav;
