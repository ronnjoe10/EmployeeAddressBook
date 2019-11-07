import { createStore, combineReducers } from 'redux'
import * as Reducers from './Reducers'

//Reducers to hold state of the app
const rootReducer = combineReducers({
    popupState: Reducers.OpenPopupReducer,
    dataStore: Reducers.AddDataReducer
});
//creating a store 
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store;