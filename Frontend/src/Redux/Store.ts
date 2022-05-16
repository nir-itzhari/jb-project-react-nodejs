import { composeWithDevTools } from "redux-devtools-extension"
import { vacationsReducer } from './VacationsState';
import { combineReducers, createStore } from "redux";
import { authReducer } from './AuthState';
import { followersReducer } from "./FollowersState";

const reducer = combineReducers({ vacationsState: vacationsReducer, authState: authReducer, followersState: followersReducer });

const store = createStore(reducer, composeWithDevTools());
export default store