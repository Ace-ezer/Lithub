import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Loader from './components/assests/Loader'
// Creating Redux Store
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
// For firebase
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import { isLoaded, getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}))
  )
);
//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const rrfConfig = {
  useFirestoreForProfile: true, 
  userProfile: 'users'
}

const rrfProps = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance: createFirestoreInstance
}

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)

  if (!isLoaded(auth)) return (
    <Loader />
  )

  return children
}

ReactDOM.render(
  //<React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps} >
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
