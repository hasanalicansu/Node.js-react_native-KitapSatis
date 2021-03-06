import React, { Component } from 'react'
import RooterComponent from './src/routers/router'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/redux/reducers';
import ReduxThunk from 'redux-thunk';


export default class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        
        <RooterComponent></RooterComponent>
        
        
      </Provider>

    )
  }
}
