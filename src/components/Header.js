import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions'

let styles = {
  topBar: {
    padding: '10px 15px',
    marginBottom: '50px'
  },
  topBarLeft: {
    float: 'left',
    fontSize: '1.5em'
  },
  topBarLeftAll: {
    float: 'left'
  },
  topBarRight: {
    float: 'right'
  },
  link: {
    color: '#00bcd4',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'color 0.4s',
    margin: '0 8px'
  },
  'link:hover': {
    color: '#1976d2'
  }
}

class Header extends Component {
  handleHome = () =>{
    this.props.fetchPictures()
  }
  render() {
    return(
      <div>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <Link to="/" style={styles.link} onClick={this.handleHome}>Pinterest-Clone</Link>
          </div>
          {this.props.authenticated ? (
            <div style={styles.topBarRight}>
              <Link to="/addpicture" style={styles.link}>Add Pic</Link>
              <Link to="/mypictures" style={styles.link}>My Pics</Link>
              <Link to="/signout" style={styles.link}>Sign Out</Link>
            </div>
          ) : (
            <div style={styles.topBarRight} >
              <Link to="/signin" style={styles.link}>Sign In</Link>
              <Link to="/signup" style={styles.link}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
