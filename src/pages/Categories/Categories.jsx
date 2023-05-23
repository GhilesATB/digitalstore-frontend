import "./datatable.scss";
import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";
import {Alert, Button, CircularProgress, TablePagination} from "@mui/material";
import Drawer from "../../components/drawer/Drawer";
import ViewFrom from "./Form/ViewFrom";
import EditForm from "./Form/EditFrom";
import DataTableButtonGroup from "../../components/datatable/dataTableButtongroup";
import Table from "@mui/material/Table";
import DatatableHead from "../../components/datatable/dataTableHead";
import TableContainer from "@mui/material/TableContainer";
import DataTableRow from "../../components/datatable/dataTableRow";
import TableBody from "@mui/material/TableBody";
import {RemoveDialog} from "./Form/RemoveDialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateFrom from "./Form/CreateFrom";

const Categories = (props) => {
    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(10);
    const [categoryId, setCategoryId] = useState("");
    const [action, setAction] = useState('');

    const handleChangePage = (event, page) => {
        setPage(page + 1);
    };
    const handleChangeRowsPerPage = (event) => {
        setPerPage(parseInt(event.target.value, 10));
    };

    const {
        data: categories, isLoading, isSuccess, isError, error
    } = useGetCategoriesQuery({page: page, per_page: per_page});

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open, actionForm, id) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setCategoryId(id);
        setState({ ...state, [anchor]: open });
        setAction(actionForm);
    };

    const create = () =>{
        return toggleDrawer("right", true, 'create');
    }
    const view = (id) =>{
        return toggleDrawer("right", true, 'view',id);
    }

    const edit = (id) =>{
        return toggleDrawer("right", true, 'edit',id);
    }

    const remove = (id) =>{
        setCategoryId(id)
        handleClickOpen();
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = (id) =>{
        setCategoryId(id);
        return handleClickOpen();
    }

    const datatable = (count) => {
        return (<>
            <div className="datatableTitle">
                Category List
                    <Button color="success" onClick={toggleDrawer("right", true, 'create')}><AddBoxIcon variant="contained"/> Add Category</Button>
            </div>
            <RemoveDialog
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                categoryId={categoryId}/>
            <Paper>
                <TableContainer sx={{maxHeight: "75vh", minHeight: 600, overflowY: "scroll"}}>
                    <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                        <DatatableHead headers={['Name', 'Description', 'action']} fields={[]}/>
                        <TableBody>
                            {categories.data.map((row, key) => (
                                <DataTableRow row={row} fields={['Name', 'Description']} key={key}>
                                    <DataTableButtonGroup
                                        view={view(row.id)}
                                        edit={edit(row.id)}
                                        remove={() => handleRemove(row.id)}
                                    />
                                </DataTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={per_page}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Drawer
                sx={{
                    width:'400px',
                }}
                open={state['right']}
                    onOpen={toggleDrawer("right", true)}
                    onClose={toggleDrawer("right", false)}>
                    {action === 'create' ? <CreateFrom From /> : ""}
                    {action === 'view' ? <ViewFrom id={categoryId} /> : ""}
                    {action === 'edit' ? <EditForm id={categoryId} /> : ""}
            </Drawer>
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

export default Categories;