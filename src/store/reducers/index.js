import { combineReducers } from "redux";

import Auth from "./Auth";
import Product from "./Product";

const reducers = combineReducers({
    Auth,
    Product
});

export default reducers;