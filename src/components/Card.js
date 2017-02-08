import React, {Component} from 'react';
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import {red500} from 'material-ui/styles/colors';

const styles = {
  card: {
    width: '350px',
    height: '80%',
    overflowY: 'auto',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#FAFAFA'
  },
  media: {
    padding: '5px',

  },
  header: {
    diplay: 'flex'
  },
  title: {
    textAlign: 'left',
    flex: 1
  },
  icon: {
    fontSize: '35px',
    paddingTop: '15px',
    paddingRight: '10px',
    cursor: 'pointer'
  },
  likes: {
    paddingRight: '7px',
    fontWeight: '400',
    fontSize: '22px'
  }
}

class PicCard extends Component {
  state = { liked: false }

  componentWillMount = () => {
    var test = localStorage.getItem('id');
    var id = this.props.likedPics;
    if(id.indexOf(test) !== -1) {
      this.setState({liked: true})
    } else {}
  }
  handleLike = () => {
    var test = localStorage.getItem('id');
    if(test){
      this.props.handleLike(this.props._id);
      var id = this.props.likedPics;
      if(id.indexOf(test) !== -1) {
        this.setState({liked: false})
      } else {
        this.setState({liked: true})
      }
    }

  }
  userClick = () => {
    this.props.userClick(this.props.poster._id)
  }
  render() {
    return(
      <Card style={styles.card}>
        <CardMedia style={styles.media}>
          <img src={this.props.url} role="presentation"/>
        </CardMedia>

        <div style={{display: 'flex'}}>
          <CardTitle style={styles.title} title={this.props.title} />
          <p style={styles.likes}>{this.props.likes}</p>
          <FontIcon onClick={this.handleLike}
                    className="material-icons"
                    style={styles.icon} color={red500}>
                    {this.state.liked ? "favorite" : "favorite_border" }
          </FontIcon>
        </div>

        <Chip
          style={{margin: 4, cursor: 'pointer'}}
          onClick={this.userClick}
        >
          <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
          {this.props.poster.username}
        </Chip>
      </Card>
    )
  }
}

export default PicCard;
