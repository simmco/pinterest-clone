import React, { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }
  render() {
    const { handleSubmit, fields: { email, password }, errorMessage} = this.props;

    return (
      <Card style={styles.container}>
        <h2 style={styles.cardHeading}>Login</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div style={styles.fieldLine}>
            <TextField
              floatingLabelText="Email"
              name="email"
              {...email} />
          </div>
          <div style={styles.fieldLine}>
            <TextField
              floatingLabelText="Password"
              name="password"
              {...password} type="password"/>
          </div>
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          <div style={styles.buttonLine}>
            <RaisedButton type="submit" label="Sign in" primary />
          </div>
        </form>
        <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
      </Card>

    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

let styles = {
  container: {
    margin: '0 auto',
    textAlign: 'center',
    maxWidth: '700px'
  },
  cardHeading: {
    padding: '16px'
  },
  fieldLine: {
    padding: '16px'
  },
  buttonLine: {
    padding: '16px'
  },
  errorMessage: {
    padding: '0 16px',
    color: 'tomato'
  }
}
