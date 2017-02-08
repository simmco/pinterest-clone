import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import RequireAuth from './components/auth/Require_auth';
import Home from './components/Home';
import AddPicture from './components/AddPicture';
import MyPicsContainer from './components/MyPicsContainer';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import './index.css';

//for material-ui touch/tap/click
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if(token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
    <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="all" component={Home} />
          <Route path="signin" component={Signin} />
          <Route path="signout" component={Signout} />
          <Route path="signup" component={Signup} />
          <Route path="feature" component={RequireAuth(Feature)} />
          <Route path="addpicture" component={RequireAuth(AddPicture)} />
          <Route path="mypictures" component={RequireAuth(MyPicsContainer)} />
          <Route path=":id" component={Home} />
        </Route>
      </Router>
    </MuiThemeProvider>
    </Provider>,
  document.getElementById('root')
);
