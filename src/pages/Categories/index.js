import "./list.scss"
import Categories from "./Categories";
import * as React from "react";

import {Box, CircularProgress, Typography} from "@mui/material";
import Dashboard from '../../hoc/DashBoard'
import {WarningSharp} from "@mui/icons-material";
import AuthGuard from "../../utils/HandleAuthentication";


const CategoryPage = () => {
    return (
        <AuthGuard>
            <Dashboard>
                <Categories/>
            </Dashboard>
        </AuthGuard>
    )
}

export default CategoryPage