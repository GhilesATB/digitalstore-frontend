import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import * as React from "react";
import {Box, Button, Fab, Stack, TextField} from "@mui/material";
import {useAddNewCategoryMutation} from "../../../features/api/Categories/categoriesApi";
import {CloseOutlined} from "@mui/icons-material";
import {useFormik} from "formik";
import {formValues, validation} from "./createSchema";
import {notifyError, notifySuccess} from '../../../utils/Notifications';
import {setFormikErrors} from '../../../utils/HandleErrors';


const CreateCategoryForm = ({handleClose}) => {


    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false);

    const [addNewCategory, {isLoading}] = useAddNewCategoryMutation();

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {

            var data = new FormData();
            Object.entries(values).forEach(entry => {
                const [key, value] = entry;
                data.append(key, value);
            });

            if (selectedFile) {
                data.set('image', selectedFile);
            }

            addNewCategory(data)
                .unwrap()
                .then(() => {
                    notifySuccess();
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

    return (<form  onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <Stack spacing={5} sx={{margin: '30px', width: '300px'}}>

            <h1>Create new Category</h1>
            <Box sx={{display: 'flex'}}>
                <div>
                    <img style={{width: "320px", height: "240px", position: "relative", margin: "auto"}}
                         src={
                             isFilePicked
                                 ? URL.createObjectURL(selectedFile)
                                 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                id="filled-error-helper-text"
                label="Name"
                name="name"
                defaultValue=""
                variant="standard"
                inputProps={{inputMode: 'text'}}
                placeholder="Name"
                InputLabelProps={{shrink: true}}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
                id="standard-multiline-static"
                label="Description"
                name="description"
                multiline
                variant="standard"
                maxRows={5}
                defaultValue= ""
                inputProps={{inputMode: "text"}}
                placeholder="Description ..."
                InputLabelProps={{shrink: true}}
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            <Button variant="contained" type="submit">
                create
            </Button>
        </Stack>
    </form>);

}

export default CreateCategoryForm;
