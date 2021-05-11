import { createStore, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import {reducer, initialState } from './reducers'

export const store = createStore(
	reducer,
	initialState,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);