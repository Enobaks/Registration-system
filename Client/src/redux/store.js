import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import loginReducer from "./user/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";

const composer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  composeWithDevTools;





export const store = createStore(rootReducer, composer(applyMiddleware(thunk)));

export const persistor = persistStore(store);
