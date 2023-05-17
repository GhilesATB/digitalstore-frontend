import "./datatable.scss";
import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";
import {Alert, CircularProgress, TablePagination} from "@mui/material";
import Datatable from "../../components/datatable/Datatable";


const UsersDatatable = () => {
    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(10);
    const handleChangePage = (event, page) => {
        setPage(page + 1);
    };
    const handleChangeRowsPerPage = (event) => {
        setPerPage(parseInt(event.target.value, 10));
    };

    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery({page: page, per_page: per_page});
    const datatable = (count) => {
        return (<>
            <Paper>
                <Datatable
                    data={categories.data}
                    headers={['Id', 'Name', 'Description', 'action']}
                    fields={['Id', 'Name', 'Description']}
                />
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={per_page}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>);
    }
    let content

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {

        const count = categories.meta.total;

        content = datatable(count);

    } else if (isError) {
        content = <div><Alert variant="filled" severity="error">
            This is an error alert — check it out!
        </Alert></div>
    }

    return (<>{content}</>);
};

export default UsersDatatable;