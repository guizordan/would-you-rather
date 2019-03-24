import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middlewares = composeWithDevTools(applyMiddleware(thunk));

export default middlewares;
