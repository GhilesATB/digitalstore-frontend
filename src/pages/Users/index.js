import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import UsersDatatable from "./usersDatatable";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import * as React from "react";

const List = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <div className="datatable">
                    <div className="datatableTitle">
                        Add New User

                        <Link to="/users/new" className="link">
                            <Button color="success"><AddBoxIcon variant="contained"/> Add User</Button>
                        </Link>
                    </div>
                    <UsersDatatable/>
                </div>
            </div>
        </div>
    )
}

export default List