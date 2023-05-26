import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import * as React from "react";
import {Alert, Button, CircularProgress, Stack, TextField} from "@mui/material";
import { useEditCategoryMutation, useGetCategoryByIdQuery } from "../../../features/api/Categories/categoriesApi";
import { CloseOutlined} from "@mui/icons-material";
import { useFormik } from "formik";
import { validation, formValues } from "./createSchema";

const EditCategoryForm = ({handleClose,categoryId}) => {
    
    const {
        data: category,
        isLoading: isLoadingCategory,
        isSuccess:isSuccessCategoryFetch,
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
              data.append(key, value);
            });
  
          data.append('image', selectedFile);
    
        editCategory(data).unwrap()
        .then(() => {
          alert('success');
          handleClose();
        })
        .catch((error) => {
          alert('error')
          handleClose();
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
    content =  <form  onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <Stack spacing={5} sx={{margin: '30px', width: '300px'}}>
    
            <h1>Edit Category</h1>
            <img style={{borderRadius: "50%", width: "150px", position: "relative", margin: "auto"}}
                 src={
                    isFilePicked
                         ? URL.createObjectURL(selectedFile)
                         : category?.data?.image
                }
                 alt=""
            />
            <div className="formInput">
                <label htmlFor="image">
                    Image:  {!isFilePicked ? <DriveFolderUploadOutlinedIcon style={{position: "absolute",top: "13%",left: "64%",}} className="icon"/>:""}
                    
                </label>
                <input
                    type="file"
                    id="image"
                    name="image" 
                    onChange={changeHandler} 
                    style={{display: "none"}}
                />
            </div>
            {isFilePicked ? <CloseOutlined style={{position: "absolute",top: "13%",left: "64%",}} className="icon" onClick={cancelFile}/>:""}
            

            <TextField
                id="filled-error-helper-text"
                label="Name"
                name="name"
                variant="standard"
                inputProps={{inputMode: 'text'}}
                placeholder="Name"
                InputLabelProps={{shrink: true}}
                onChange={formik.handleChange}
                value={formik?.values?.name}
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
