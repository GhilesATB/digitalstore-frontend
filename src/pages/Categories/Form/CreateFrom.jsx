import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import * as React from "react";
import {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";


const CreaseUserForm = (props) => {

    const name = props?.inputs?.data?.name;
    const description = props?.inputs?.data?.description;

    const [file, setFile] = useState("");

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
                    id="filled-error-helper-text"
                    label="Name"
                    defaultValue= {name}
                    variant="standard"
                    inputProps={{inputMode: 'text'}}
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
                defaultValue= {description}
                inputProps={{inputMode: "text"}}
                placeholder="Description ..."
                InputLabelProps={{shrink: true}}
            />

            <Button variant="contained">
                create
            </Button>
        </Stack>
    </form>);

}

export default CreaseUserForm;