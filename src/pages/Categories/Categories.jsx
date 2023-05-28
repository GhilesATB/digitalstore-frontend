import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Button, CircularProgress, Stack} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";
import Box from "@mui/material/Box";
import DataTableButtonGroup from "../../components/datatable/dataTableButtongroup";
import CategoryDrawer from './Drawer';
import ViewFrom from "./Form/ViewFrom";
import EditForm from "./Form/EditFrom";
import CreateFrom from "./Form/CreateFrom";
import {RemoveDialog} from './Form/RemoveDialog';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const handleGetRowId = (e) => {
    return e.id
}

export default function Categories() {

    const columns = [
        {field: 'id', headerName: 'ID', flex: 1},
        {
            field: 'thumbnail', headerName: 'Image', flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <Box
                            component="img"
                            sx={{
                                height: 48,
                                width: 48,
                                borderRadius: '50%'
                            }}
                            alt=""
                            src={params.row.image}
                        />
                    </>
                );
            }
        },
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'description', headerName: 'Description', flex: 1},
        {
            field: 'actions',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return (
                    <>
                        <Box>
                            <DataTableButtonGroup
                                view={() => renderForm(params?.row?.id, 'view')}
                                edit={() => renderForm(params?.row?.id, 'edit')}
                                remove={() => remove(params?.row?.id)}
                            />
                        </Box>
                    </>
                );
            }
        },
    ];

    const [state, setState] = React.useState(false);
    const [categoryId, setCategoryId] = React.useState(null);
    const [formAction, setFormAction] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [paginationModel, setPaginationModel] = React.useState({page: 0, pageSize: 10,});
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery(paginationModel);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderForm = (categoryId, formAction) => {
        setCategoryId(categoryId);
        setFormAction(formAction);
        setState(true);
    }

    const close = () => {
        return setState(false);
    }

    const remove = (id) => {
        setCategoryId(id)
        handleClickOpen();
    }

    let content = '';

    if (isLoading) {
        content = <CircularProgress/>
    } else {
        content = <>
            <ToastContainer/>
            <RemoveDialog
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                categoryId={categoryId}/>
            <CategoryDrawer
                anchor={'right'}
                close={close}
                open={state}
            >
                {formAction === 'create' ? <CreateFrom handleClose={close}/> : ""}
                {formAction === 'view' ? <ViewFrom categoryId={categoryId} handleClose={close}/> : ""}
                {formAction === 'edit' ? <EditForm categoryId={categoryId} handleClose={close}/> : ""}
            </CategoryDrawer>

            <Stack spacing={5} sx={{margin: '30px'}}>
                <div className="datatableTitle">
                    Category List
                    <Button color="success" sx={{"float": "right"}}
                            onClick={() => renderForm(null, 'create')}><AddBoxIcon
                        variant="contained"/> Add Category</Button>
                </div>
                <div style={{height: '77vh', width: '100%'}}>
                    <DataGrid
                        rows={categories?.data}
                        columns={columns}
                        getRowId={(row) => handleGetRowId(row)}
                        rowCount={categories?.meta?.total}
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 20, 25]}
                        checkboxSelection
                        isRowSelectable={(params) => false}
                    />
                </div>
            </Stack>
        </>
    }
    return content;
}