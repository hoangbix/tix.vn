import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/configStore";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
//Cấu hình realtime
import * as signalR from "@aspnet/signalr";

import "./assets/scss/index.scss";
import "./assets/scss/tailwind.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";
import "../node_modules/react-modal-video/scss/modal-video.scss";
import { DOMAIN } from "./util/config";

import App from "./App";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const root = createRoot(document.getElementById("root"));

connection
  .start()
  .then(() => {
    root.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  })
  .catch((error) => {
    alert(error.message);
  });

// root.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>
// );
