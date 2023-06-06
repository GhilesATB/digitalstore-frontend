import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import {DarkModeContextProvider} from "./context/darkModeContext";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
         <ToastContainer/>
        <React.StrictMode>
            <DarkModeContextProvider>
                <App/>
            </DarkModeContextProvider>
        </React.StrictMode>
    </Provider>
);
