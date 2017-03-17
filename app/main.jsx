'use strict'
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';

import store from './store';

// components
import Jokes from './components/Jokes';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';

// containers
import AppContainer from './containers/AppContainer.jsx';

// utilities
import onEnterData from './utilities/onEnterData';

// actions
import { addCommand } from './reducers/commands';

// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children}
//     </div>
// )

const onAppContainerEnter = () => {
  onEnterData.commands.forEach((command) => {
    store.dispatch(addCommand(command.text));
  });
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppContainerEnter}>
        {/*<IndexRedirect to="/jokes" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
