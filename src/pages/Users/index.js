import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import UsersDatatable from "./usersDatatable";

const List = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <UsersDatatable/>
            </div>
        </div>
    )
}

export default List