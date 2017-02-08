import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { browserHistory } from 'react-router';

import CardList from './CardList';


class MyPics extends Component {
  render() {
    return(
      <div>
        <CardList fetchPictures={this.props.fetchUser}
                  pictures={this.props.pictures}
                  likePicture={this.props.likePicture}
                  userClicked={this.userClicked}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { pictures: state.pictures  }
}

export default connect(mapStateToProps, actions)(MyPics);
