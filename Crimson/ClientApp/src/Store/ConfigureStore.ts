import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';

export default function ConfigureStorex(history: History): Store {
  const middleware = [
    thunk,
    routerMiddleware(history),
  ];

  const rootReducer = combineReducers({
    router: connectRouter(history),
  });

  const enhancers = [];
  const windowIfDefined = typeof window === 'undefined' ? null : window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middleware), ...enhancers),
  );
}
