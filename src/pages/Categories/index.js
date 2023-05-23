import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Categories from "./Categories";
import * as React from "react";
import {useState} from "react";

const List = () => {
    const [file, setFile] = useState("");


    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <div className="datatable">
                    <Categories/>
                </div>
            </div>
        </div>
    )
}

export default List