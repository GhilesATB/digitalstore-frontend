import * as React from "react";
import {CircularProgress, Stack} from "@mui/material";
import {useGetCategoryByIdQuery} from "../../../features/api/Categories/categoriesApi";
import Box from "@mui/material/Box";
import {notifyError} from "../../../utils/Notifications";


const ViewUserForm = ({categoryId, handleClose}) => {

    const {data: category, isLoading, isSuccess, isError, error} = useGetCategoryByIdQuery(categoryId);

    if (isError) {
        notifyError(error.data.message);
        handleClose();
    }

    const form = () => {
        return (
            <form>
                <Stack spacing={5} sx={{margin: '30px', width: '320px'}}>

                    {
                        isLoading ?
                            <CircularProgress sx={{
                                position: "absolute",
                                top: "calc(50% - 32px)",
                                left: 'calc(50% - 32px)'
                            }}
                            /> :
                            <>
                                <Box sx={{display: 'flex'}}>
                                    <img style={{width: "320px", height: "240px", position: "relative", margin: "auto"}}
                                         src={category?.data?.image ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                         }
                                         alt=""
                                    />
                                </Box>


                                <Box sx={{textAlign: 'left'}}>
                                    Name :<br/>
                                    {category?.data?.name}
                                </Box>

                                <Box sx={{textAlign: 'left'}}>
                                    Description :<br/>
                                    {category?.data?.description}
                                </Box></>
                    }
                </Stack>
            </form>
        );
    }

    if (isError) {
        notifyError(error.data.message);
    }

    return (<>{form()}</>);
}

export default ViewUserForm;