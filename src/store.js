import reducers from "./reducers";
import middlewares from "./middlewares";

import { createStore } from "redux";

const store = createStore(reducers, middlewares);

export default store;
