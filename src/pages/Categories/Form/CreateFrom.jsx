import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import * as React from "react";
import {Box, Button, Stack, TextField} from "@mui/material";
import {useAddNewCategoryMutation} from "../../../features/api/Categories/categoriesApi";
import {CloseOutlined} from "@mui/icons-material";
import {useFormik} from "formik";
import {formValues, validation} from "./createSchema";

const CreateCategoryForm = (props) => {
    
    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false);
    
    const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();
    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {

          var data = new FormData();
          Object.entries(values).forEach(entry => {
            const [key, value] = entry;
            data.append(key, value);
          });

        data.set('image', selectedFile);

          addNewCategory(data)
            .unwrap()
            .then(() => {
              alert('success')
            })
            .catch((error) => {
                alert(JSON.stringify(error))
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
 


    
    return (<form  onSubmit={formik.handleSubmit} enctype='multipart/form-data'>
        <Stack spacing={5} sx={{margin: '30px', width: '300px'}}>

            <h1>Create new Category</h1>
            <Box sx={{flex: 1}}>
                <img style={{borderRadius: "50%", width: "150px", position: "relative", margin: "auto"}}
                     src={
                         isFilePicked
                             ? URL.createObjectURL(selectedFile)
                             : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                     }
                     alt=""
                />
            </Box>
            <div className="formInput">
                <label htmlFor="image">
                    Image: {!isFilePicked ?
                    <DriveFolderUploadOutlinedIcon style={{position: "absolute", top: "13%", left: "64%",}}
                                                   className="icon"/> : ""}

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
                defaultValue= ""
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
