import * as React from 'react';
import {Stack} from "@mui/material";
import CategoryDrawer from './Drawer';
import {RemoveDialog} from './Form/RemoveDialog';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoriesDataGrid from './CategoriesDataGrid';
import ActionForm from './ActionFom';
import TopBar from './TopBar';

export default function Categories({categories, paginationModel, setPaginationModel}) {

    const [state, setState] = React.useState(false);
    const [formAction, setFormAction] = React.useState(null);

    const [categoryId, setCategoryId] = React.useState(null);
    const [open, setOpen] = React.useState(false);

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

    return (
        <>
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
                <ActionForm
                    handleClose={close}
                    categoryId={categoryId}
                    formAction={formAction}
                />
            </CategoryDrawer>

            <Stack spacing={5} sx={{margin: '30px'}}>
                <TopBar renderForm={renderForm}/>
                <div style={{height: '77vh', width: '100%'}}>
                    <CategoriesDataGrid categories={categories}
                                        paginationModel={paginationModel}
                                        setPaginationModel={setPaginationModel}
                                        renderForm={renderForm}
                                        remove={remove}
                    />
                </div>
            </Stack>
        </>
    );
}