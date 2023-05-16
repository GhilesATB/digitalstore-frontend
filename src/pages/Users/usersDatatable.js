import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";

const UsersDatatable = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery()

    const userColumns = [
        { field: "id", headerName: "ID", width: 300 },
        {
            field: "name",
            headerName: "name",
            width: 300,
        },
        {
            field: "description",
            headerName: "description",
            width: 300,
        },
    ];


    const handleDelete = (id) => {};

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    let content

    if (isLoading) {
        content = 'loading'
    } else if (isSuccess) {
        content = <DataGrid
            className="datagrid"
            rows={categories.data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
        />
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            {content}
        </div>
    );
};

export default UsersDatatable;