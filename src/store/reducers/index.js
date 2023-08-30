import { combineReducers } from "redux";

import Auth from "./Auth";
import Product from "./Product";
import Market from "./Market";

const reducers = combineReducers({
    Auth,
    Product,
    Market
});

export default reducers;