import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


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
    display: 'flex',
    float: 'right'
  },
  link: {
    color: '#00bcd4',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'color 0.4s'
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
            <h3 style={styles.link}>Hello {this.props.username}</h3>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <Link to="/addpicture" style={styles.link}><MenuItem primaryText="Add Picture" /></Link>
              <Link to="/mypictures" style={styles.link}><MenuItem primaryText="My Pictures" /></Link>
              <Link to="/signout" style={styles.link}><MenuItem primaryText="Sign out" /></Link>
            </IconMenu>
            </div>

          ) : (
            <div style={styles.topBarRight} >
              <h3 style={styles.link}>Welcome</h3>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <Link to="/signin" style={styles.link}><MenuItem primaryText="Signin" /></Link>
              <Link to="/signup" style={styles.link}><MenuItem primaryText="Signup" /></Link>
             </IconMenu>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated,
           username: state.auth.username};
}

export default connect(mapStateToProps, actions)(Header);
