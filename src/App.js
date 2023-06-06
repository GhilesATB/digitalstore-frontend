import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Categories from "./pages/Categories";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./style/dark.scss";
import {useContext} from "react";
import {DarkModeContext} from "./context/darkModeContext";
import MainDrawer from "../src/hoc/DashBoard";
import SignIn from '../src/pages/User/SignIn'
import Front from '../src/pages/front'
import { AuthGuard } from "./utils/HandleAuthentication";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthGuard></AuthGuard>
      <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Front/>}/>
                <Route path="login" element={<SignIn/>}/>
                <Route path="/admin" element={<Home/>}/>
                <Route path="categories">
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
