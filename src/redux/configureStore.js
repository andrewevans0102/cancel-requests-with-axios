import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const middleware = [thunk];
const enhancers = [];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, composedEnhancers);

  return { store };
}
