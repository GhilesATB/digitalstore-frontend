import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDeleteCategoryMutation} from "../../../features/api/Categories/categoriesApi";
import {notifyError, notifySuccess} from '../../../utils/Notifications';

export const RemoveDialog = ({open,handleClose,categoryId}) => {

    const [deleteCategory, { isLoading, error, isSuccess, isError }] =
        useDeleteCategoryMutation();

    useEffect(() => {
        if (isSuccess) {
            notifySuccess();
            handleClose();
        }
        if (isError) {
            notifyError(Error.data.message);
        }
    }, [isLoading]);

    return (
         <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to remove this data?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        the data will no longer be available <br/> are you sure you want to delete it ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => deleteCategory({ id: categoryId })}>delete</Button>
                    <Button color="info" onClick={handleClose} autoFocus>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}