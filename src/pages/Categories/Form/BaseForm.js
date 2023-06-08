import {Box, Button, Divider, Stack, TextField} from "@mui/material";
import PreviewImageUpload from "./PreviewImageUpload";


const BaseForm = ({
    title,
    image,
    formik,
    changeHandler,
    selectedFile,
    isFilePicked,
    cancelFile,
 }) =>{
    return (
       
        <Stack spacing={1} sx={{margin: '30px', width: '300px'}}>
            <Box sx={{margin: "8px 6px", 'text-transform': 'uppercase'}}>
                {title}
                <Divider/>
            </Box>
            <PreviewImageUpload
                image={image}
                changeHandler={changeHandler}
                selectedFile={selectedFile}
                isFilePicked={isFilePicked}
                cancelFile={cancelFile}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
            />

<TextField
                sx={{height:"75px"}}
                id="standard-multiline-static"
                label="Name"
                name="name"
                variant="standard"
                inputProps={{inputMode: "text"}}
                placeholder="Category name"
                InputLabelProps={{shrink: true}}
                onChange={formik.handleChange}
                value={formik?.values?.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                />

            <TextField
                sx={{height:"160px"}}
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
                create
            </Button>
        </Stack>
    );
} 

export default BaseForm;