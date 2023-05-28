import * as React from "react";
import {Alert, CircularProgress, Stack} from "@mui/material";
import {useGetCategoryByIdQuery} from "../../../features/api/Categories/categoriesApi";
import Box from "@mui/material/Box";


const ViewUserForm = ({categoryId}) => {

    const {data: category, isLoading, isSuccess, isError, error} = useGetCategoryByIdQuery(categoryId);

    const form = () => {
        return (
            <form>
                <Stack spacing={5} sx={{margin: '30px', width: '300px'}}>

                    <img style={{borderRadius: "50%", width: "150px", position: "relative", margin: "auto"}}
                         src={category?.data?.image ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                         }
                         alt=""
                    />

                    <Box sx={{textAlign: 'left'}}>
                        Name :<br/>
                        {category?.data?.name}
                    </Box>

                    <Box sx={{textAlign: 'left'}}>
                        Description :<br/>
                        {category?.data?.description}
                    </Box>
                </Stack>
            </form>
        );
    }

    let content = '';

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

export default ViewUserForm;