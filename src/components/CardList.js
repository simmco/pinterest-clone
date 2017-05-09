import React, { Component } from "react";

import PicCard from "./Card.js";

const styles = {
  container: {
    margin: "0 auto",
    padding: "0 30px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center"
  }
};

class Grid extends Component {
  componentWillMount() {
    this.props.fetchPictures();
  }
  handleLike = id => {
    this.props.likePicture(id);
  };
  handleDelete = (picId, userId) => {
    this.props.handleDelete(picId, userId);
  };
  userClick = user => {
    this.props.userClicked(user);
  };
  render() {
    return (
      <div style={styles.container}>
        {this.props.pictures.map(pic => (
          <PicCard
            key={pic._id}
            handleLike={this.handleLike}
            userClick={this.userClick}
            handleDelete={this.handleDelete}
            {...pic}
          />
        ))}
      </div>
    );
  }
}

export default Grid;
