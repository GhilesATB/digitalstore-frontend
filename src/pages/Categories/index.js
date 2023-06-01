import "./list.scss"
import Categories from "./Categories";
import * as React from "react";
import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";
import {Box, CircularProgress, Typography} from "@mui/material";
import Dashboard from '../../hoc/DashBoard'
import {WarningSharp} from "@mui/icons-material";

const CategoryPage = () => {

    const [paginationModel, setPaginationModel] = React.useState({page: 0, pageSize: 10});

    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery(paginationModel);

    return (
        <Dashboard>
            {isLoading ?
                <CircularProgress sx={{
                    position: "absolute",
                    top: "calc(50% - 32px)",
                    left: 'calc(50vw - 32px)'
                }}
                /> : ""}
            {isSuccess ?
                <Categories

                    categories={categories}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    isError={isError}
                    error={error}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                /> : ""
            }
            {isError ?
                <>
                    <Box>
                        <WarningSharp
                            color="primary"
                            sx={{
                                position: "absolute",
                                top: "calc(50% - 160px)",
                                left: 'calc(50vw - 160px)',
                                fontSize: '300px',
                            }}
                        >;
                        </WarningSharp>

                        <Typography color="primary" variant="h6" component="h6" sx={{
                            position: "absolute",
                            top: "calc(85% - 160px)",
                            left: 'calc(50vw - 200px)',
                        }}>
                            Something went wrong please try again later
                        </Typography></Box></> : ""
            }

        </Dashboard>
    )
}

export default CategoryPage