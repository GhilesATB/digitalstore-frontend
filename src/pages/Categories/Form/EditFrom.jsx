import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import * as React from "react";
import {useState} from "react";
import {Alert, Button, CircularProgress, Stack, TextField} from "@mui/material";
import {useGetCategoryByIdQuery} from "../../../features/api/Categories/categoriesApi";


const EditUserForm = (props) => {

    const {data: category, isLoading, isSuccess, isError, error} = useGetCategoryByIdQuery(props?.id);

    const [file, setFile] = useState("");

    const form = () => {

        return (<form>
            <Stack spacing={5} sx={{margin: '30px', width: '300px'}}>

                <img style={{borderRadius: "50%", width: "150px", position: "relative", margin: "auto"}}
                     src={
                         file
                             ? URL.createObjectURL(file)
                             : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                     }
                     alt=""
                />
                <div className="formInput">
                    <label htmlFor="file">
                        Image: <DriveFolderUploadOutlinedIcon className="icon"/>
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{display: "none"}}
                    />
                </div>

                <TextField
                    id="standard-multiline-static"
                    label="Name"
                    variant="standard"
                    defaultValue={category?.data?.name}
                    inputProps={{inputMode: "text"}}
                    placeholder="Name"
                    InputLabelProps={{shrink: true}}
                />

                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="standard"
                    maxRows={5}
                    defaultValue={category?.data?.description}
                    inputProps={{inputMode: "text"}}
                    placeholder="Description ..."
                    InputLabelProps={{shrink: true}}
                />

                <Button variant="contained">
                    save
                </Button>
            </Stack>
        </form>)
    }

    let content

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {

        content = form();

    } else if (isError) {
        content = <div><Alert variant="filled" severity="error">
            This is an error alert — check it out!
        </Alert></div>
    }

    return (<>{content}</>);


}

export default EditUserForm;