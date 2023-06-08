import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Categories from "./pages/Categories";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./style/dark.scss";
import React, {useContext} from "react";
import {DarkModeContext} from "./context/darkModeContext";
import SignIn from '../src/pages/User/SignIn'
import Front from '../src/pages/front'
import {useLazyGetAuthUserQuery} from "./features/api/Users/UsersApi";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "./store/reduces/Users";
import SignUp from "./pages/User/SignUp";

function App() {
    const {darkMode} = useContext(DarkModeContext);

    const [getAuthUser] = useLazyGetAuthUserQuery();
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!(users.id)) {
            getAuthUser()
                .unwrap()
                .then(response => dispatch(setAuth({...response})))
        }


    }, []);

    return (
        <div className={darkMode ? "app dark" : "app"}>

            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Front/>}/>
                        <Route path="login" element={<SignIn/>}/>
                        <Route path="register" element={<SignUp/>}/>
                        <Route path="/admin" element={<Home/>}/>
                        <Route path="/admin/categories">
                            <Route index element={<Categories/>}/>
                            <Route path=":categoryId" element={<Single/>}/>
                            <Route
                                path="new"
                                element={<New/>}
                            />
                        </Route>
                        <Route path="/admin/products">
                            <Route index element={<Categories/>}/>
                            <Route path=":productId" element={<Single/>}/>
                    <Route
                        path="new"
                        element={<New/>}
                    />
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
