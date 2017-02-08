import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CardList from './CardList';

class Home extends Component {
  userClicked = (e) => {
    console.log(this.props.params.id)
    console.log('clicked', e)
    // this.props.fetchUser
  }
  render() {
    return (
      <div>
        <CardList fetchPictures={this.props.fetchPictures}
                  pictures={this.props.pictures}
                  likePicture={this.props.likePicture}
                  handleDelete={this.props.deletePicture}
                  userClicked={this.props.fetchUser}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { pictures: state.pictures  }
}

export default connect (mapStateToProps, actions)(Home);
