import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "./user/reducer";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    user: userReducer.getUser
})

export default persistReducer(persistConfig, rootReducer);