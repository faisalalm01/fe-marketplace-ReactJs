import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
  storage,
  whitelist: ['Auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancer = applyMiddleware(thunk);

const store = createStore(persistedReducer, enhancer);
const persistStores = persistStore(store);

export { store, persistStores };

// import reducers from "./reducers";

// const store = configureStore({
//   reducer: {
//     data: reducers
//   }
// });

// export default store;