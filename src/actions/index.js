import axios from 'axios';
import { hashHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, FETCH_PICTURES, FETCH_USER, LIKE_PIC, DELETE_PIC } from './types';

const ROOT_URL = 'https://pinterest-clone-api.herokuapp.com';

export function signinUser( { email, password }) {

  return function(dispatch) {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/auth/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER,
                   payload: response.data.username
                 })
        // - Save the JWT token
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('id', response.data.id)
        // -redirect to the route '/feature'
        hashHistory.push('/')
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({email, password, username}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/auth/signup`, {email, password, username})
      .then(response => {
        dispatch({ type: AUTH_USER})
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('id', response.data.id)
        hashHistory.push('/')
      })
      .catch(error => dispatch(authError(error.response.data.error)));

  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('id');
  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.secret
        })
      })
  }
}

export function fetchPictures() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api`)
      .then(response => {
        dispatch({
          type: FETCH_PICTURES,
          payload: response.data.pics
        })
      })
  }
}

export function fetchUser(user) {
  var id = user || localStorage.getItem('id');
  console.log(user);
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/picture/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response);
        dispatch({
          type: FETCH_USER,
          payload: response.data.pics
        })
      })
  }
}

export function uploadPicture(url, title) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/picture`,{url, title}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err.toString());
      })
  }
}

export function likePicture(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/picture/${id}`, {}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: LIKE_PIC,
          payload: response.data.pic,
          user: response.data.user
        })
      })
  }
}

export function deletePicture(userId, picId) {
  console.group('deletePicture');
  console.log('picId: ' + picId)
  console.log('userId: ' + userId)
  console.groupEnd()
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/picture/${picId}/delete`, {userId}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: DELETE_PIC,
          payload: response.data.picId
        })
      })
  }
}
