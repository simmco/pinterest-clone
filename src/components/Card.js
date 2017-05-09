import React, { Component } from "react";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import FontIcon from "material-ui/FontIcon";
import { red500 } from "material-ui/styles/colors";

const styles = {
  card: {
    width: "350px",
    height: "80%",
    overflowY: "auto",
    margin: "10px",
    padding: "10px",
    backgroundColor: "#FAFAFA"
  },
  media: {
    padding: "5px"
  },
  header: {
    diplay: "flex"
  },
  title: {
    textAlign: "left",
    flex: 1
  },
  icon: {
    fontSize: "35px",
    paddingTop: "15px",
    paddingRight: "10px",
    cursor: "pointer"
  },
  likes: {
    paddingRight: "7px",
    fontWeight: "400",
    fontSize: "22px"
  }
};

class PicCard extends Component {
  state = {
    liked: false,
    usersPic: false
  };

  componentWillMount = () => {
    var localId = localStorage.getItem("id");
    var localUser = localStorage.getItem("username");
    var id = this.props.likedPics;
    if (id.indexOf(localId) !== -1) {
      this.setState({ liked: true });
    }
    if (localUser === this.props.poster.username) {
      this.setState({ userPics: true });
    }
  };
  handleLike = () => {
    var localId = localStorage.getItem("id");
    if (localId) {
      this.props.handleLike(this.props._id);
      var id = this.props.likedPics;
      if (id.indexOf(localId) !== -1) {
        this.setState({ liked: false });
      } else {
        this.setState({ liked: true });
      }
    }
  };
  handleDelete = () => {
    var userId = this.props.poster._id;
    var picId = this.props._id;
    this.props.handleDelete(userId, picId);
  };
  userClick = () => {
    this.props.userClick(this.props.poster._id);
  };
  render() {
    const { poster, title, likes, username, url } = this.props;
    const { liked, usersPic } = this.state;
    return (
      <Card style={styles.card}>
        <CardMedia style={styles.media}>
          <img src={url} role="presentation" />
        </CardMedia>

        <div style={{ display: "flex" }}>
          <CardTitle style={styles.title} title={title} />
          <p style={styles.likes}>{likes}</p>
          <FontIcon
            onClick={this.handleLike}
            className="material-icons"
            style={styles.icon}
            color={liked && red500}
          >
            {liked ? "favorite" : "favorite_border"}
          </FontIcon>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Chip
              style={{ margin: 10, cursor: "pointer" }}
              onClick={this.userClick}
            >
              <Avatar
                icon={
                  <FontIcon className="material-icons">perm_identity</FontIcon>
                }
              />
              {poster.username}
            </Chip>
          </div>
          {usersPic &&
            <FontIcon
              onClick={this.handleDelete}
              className="material-icons"
              style={styles.icon}
            >
              delete_forever
            </FontIcon>}
        </div>
      </Card>
    );
  }
}

export default PicCard;
