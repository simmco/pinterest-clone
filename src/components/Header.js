import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (<li className="nav-item">
        <Link to="/signout">Sign Out</Link>
      </li>)
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>
      ]
    }

  }
  render() {
    return(
      <div>
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <Link to="/" style={styles.link}>Redux Auth</Link>
          </div>
          {this.props.authenticated ? (
            <div style={styles.topBarRight}>
              <Link to="/signout" style={styles.link}>Sign Out</Link>
            </div>
          ) : (
            <div style={styles.topBarRight} >
              <Link to="/signin" style={styles.link}>Sign In</Link>
              <Link to="/signup" style={styles.link}>Sign Up</Link>
            </div>
          )}
        </div>
        {/* <ul className="navbar navbar-nav">
          {this.renderLinks()}
        </ul> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);

let styles = {
  topBar: {
    padding: '10px 15px',
    marginBottom: '50px'
  },
  topBarLeft: {
    float: 'left',
    fontSize: '1.5em'
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
