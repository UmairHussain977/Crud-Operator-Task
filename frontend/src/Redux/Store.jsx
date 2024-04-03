import { createStore,applyMiddleware } from "redux";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import RootReducer from "./RootReducer";

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,RootReducer)

const store = createStore(persistedReducer,applyMiddleware(thunk))

const persistor = persistStore(store)

export {store,persistor}