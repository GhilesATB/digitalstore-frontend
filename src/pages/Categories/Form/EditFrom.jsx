import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import * as React from "react";
import {Alert, Button, CircularProgress, Fab, Stack, TextField} from "@mui/material";
import {useEditCategoryMutation, useGetCategoryByIdQuery} from "../../../features/api/Categories/categoriesApi";
import {CloseOutlined} from "@mui/icons-material";
import {useFormik} from "formik";
import {validation} from "./createSchema";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";
import {setFormikErrors} from '../../../utils/HandleErrors';

const EditCategoryForm = ({handleClose, categoryId}) => {

    const notifySuccess = () => {
        toast.success("Element updated with success", {
            toastId: "success-notification",
            autoClose: 2000,
        });
    };
    const notifyError = (msg) =>
        toast.error(msg ?? "Something went wrong, please try again later", {
            toastId: "error-notification",
            autoClose: 2000,
        });

    const {
        data: category,
        isLoading: isLoadingCategory,
        isSuccess: isSuccessCategoryFetch,
        isError: isErrorCategoryFetch,
        error: errorCategory
    } = useGetCategoryByIdQuery(categoryId);

    const [editCategory] = useEditCategoryMutation();
    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: category?.data,
        validationSchema: validation,
        onSubmit: (values) => {

            var data = new FormData();
            Object.entries(values).forEach(entry => {
                const [key, value] = entry;
                if (value) {
                    data.append(key, value);
                }
            });


            if (selectedFile) {
                data.set('image', selectedFile);
            }

            editCategory(data).unwrap()
                .then(() => {
                    notifySuccess();
                    formik.resetForm();
                    handleClose();
                })
                .catch((error) => {
                    if (error.status === 422) {
                        setFormikErrors(formik, error.data.errors);
                    } else if (error.status === 400) {
                        notifyError(error.data.message)
                    } else {
                        notifyError(error.data.message);
                        handleClose();
                    }
                });
        },
      });
    

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const cancelFile = () =>{
        setSelectedFile(null)
        setIsFilePicked(false);
    }
 

    let content = '';

    if (isLoadingCategory) {
        content = <CircularProgress />
    }else{
        content = <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Stack spacing={5} sx={{margin: '30px', width: '300px'}}>

                <h1>Edit Category</h1>
                <Box sx={{display: 'flex'}}>
                    <div>
                        <img style={{width: "320px", height: "240px", position: "relative", margin: "auto"}}
                             src={
                                 isFilePicked
                                     ? URL.createObjectURL(selectedFile)
                                     : category?.data?.image
                             }
                             alt=""
                        />
                        <div className="formInput">
                            <Fab color="primary" aria-label="upload"
                                 style={{position: "relative", marginLeft: "-16px", top: '-32px'}}>
                                {!isFilePicked ?
                                    <>
                                        <label htmlFor="image">
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={changeHandler}
                                                style={{display: "none"}}
                                            />
                                            <BackupRoundedIcon fontSize={"large"}
                                                               style={{position: "relative", margin: "auto"}}
                                                               className="icon"/>
                                        </label></> :
                                    ""}
                                {isFilePicked ?
                                    <CloseOutlined fontSize={"large"} style={{position: "relative", margin: "auto"}}
                                                   className="icon" onClick={cancelFile}/> : ""}
                            </Fab>
                        </div>
                    </div>
                </Box>

                <TextField
                    id="standard-multiline-static"
                    label="Name"
                    name="Name"
                    multiline
                    variant="standard"
                    inputProps={{inputMode: "text"}}
                    placeholder="Name ..."
                    InputLabelProps={{shrink: true}}
                    onChange={formik.handleChange}
                    value={formik?.values?.name}
                    error={formik.touched.description && Boolean(formik.errors.name)}
                    helperText={formik.touched.description && formik.errors.name}
                />

            <TextField
                id="standard-multiline-static"
                label="Description"
                name="description"
                multiline
                variant="standard"
                rows={5}
                inputProps={{inputMode: "text"}}
                placeholder="Description ..."
                InputLabelProps={{shrink: true}}
                onChange={formik.handleChange}
                value={formik?.values?.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            <Button variant="contained" type="submit">
                save
            </Button>
        </Stack>
    </form>;
    }
        if (isErrorCategoryFetch) {
            content = <div><Alert variant="filled" severity="error">
                This is an error alert — check it out!
            </Alert></div>
        }

    return content;

}

export default EditCategoryForm;
