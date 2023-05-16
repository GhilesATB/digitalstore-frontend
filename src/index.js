import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from './store';
import {Provider} from 'react-redux';

import {DarkModeContextProvider} from "./context/darkModeContext";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <DarkModeContextProvider>
                <App/>
            </DarkModeContextProvider>
        </React.StrictMode>
    </Provider>,
document.getElementById("root")
)
;
