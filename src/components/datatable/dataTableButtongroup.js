import {Button, ButtonGroup} from "@mui/material";
import LoupeIcon from "@mui/icons-material/Loupe";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";


const DataTableButtonGroup = (props) => {
    const view = props.view;
    const edit = props.edit;
    const remove = props.remove;

    return (

        <ButtonGroup variant="text" aria-label="outlined button group">
                <Button sx={{outline: "none"}} onClick={view}><LoupeIcon variant="contained" color="info"/></Button>
                <Button sx={{outline: "none"}} onClick={edit}><ModeEditIcon variant="contained"
                                                                            color="warning"/></Button>
                <Button sx={{outline: "none"}} onClick={remove}><DeleteIcon variant="contained" color="error"/></Button>
            </ButtonGroup>

    )
}

export default DataTableButtonGroup;