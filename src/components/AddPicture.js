import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 250,
    height: 200,
    overflowY: 'auto',
    margin: '0 auto'
  },
};

class AddPicture extends Component {

  state = {
    finished: false,
    stepIndex: 0,
    title: '',
    url: '',
    username: localStorage.getItem('username')
  };
  handleTitle = (e) => {
    this.setState({title: e.target.value})
  }

  handleUrl = (e) => {
    this.setState({url: e.target.value})
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (this.state.title !== '' && this.state.url !== '') {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 1,
        error: ''
      });
    } else {
      this.setState({error: 'Please fill out the form'})
    }

    if (stepIndex === 1) {
      // upload the picture
      const { url, title } = this.state;
      this.props.uploadPicture(url, title)
    }

  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 1 ? 'Upload' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Picture Info</StepLabel>
            <StepContent>
              <p>
                Please provide the <strong>title</strong> and the <strong>url</strong> of the Picture:
              </p>
              <TextField onChange={this.handleTitle} hintText="Sunset in Bali"
                  floatingLabelText="Picture Title" />
              <TextField onChange={this.handleUrl} hintText="http://..."
                  floatingLabelText="Picture Url" />
              {this.renderStepActions(0)}
              {this.state.error && <p style={{ color: 'red'}}>{this.state.error}</p>}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Upload Picture</StepLabel>
            <StepContent>
              <p>This is how your picture will look like:</p>
              <GridList
                cellHeight={180}
                style={styles.gridList}
              >
              <GridTile
                title={this.state.title}
                subtitle={<FlatButton><span>by <b>{this.state.username}</b></span></FlatButton>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                cols={2}
              >
                <img src={this.state.url} />
              </GridTile>
            </GridList>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}


export default connect(null, actions)(AddPicture);
