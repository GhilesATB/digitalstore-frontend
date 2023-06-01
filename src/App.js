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

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="test" element={<MainDrawer/>}/>
                <Route path="categories">
                    <Route index element={<Categories/>}/>
                    <Route path=":categoryId" element={<Single/>}/>
                    <Route
                        path="new"
                        element={<New/>}
                    />
                </Route>
                <Route path="products">
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
