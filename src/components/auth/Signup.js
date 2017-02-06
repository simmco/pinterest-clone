import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }
  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }, errorMessage} = this.props;
    return (
      <Card style={styles.container}>
        <h2 style={styles.cardHeading}>Sign up</h2>

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div style={styles.fieldLine}>
            <TextField
              floatingLabelText="Email"
              name="email"
              {...email} />
            {email.touched && email.error && <div>{email.error}</div>}
          </div>
          <div style={styles.fieldLine}>
            <TextField
              floatingLabelText="Password"
              name="password"
              {...password} type="password"/>
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          <div style={styles.fieldLine}>
            <TextField
              floatingLabelText="Password"
              name="password"
              {...passwordConfirm} type="password"/>
            {passwordConfirm.touched && passwordConfirm.error && <div>{passwordConfirm.error}</div>}
          </div>
          {errorMessage && <p>{this.props.errorMessage}</p>}
          <div style={styles.buttonLine}>
            <RaisedButton type="submit" label="Sign up" primary />
          </div>
        </form>
      </Card>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if(!formProps.email) {
    errors.password = 'Please enter a password'
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);

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
