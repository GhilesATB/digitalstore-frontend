import {Button, ButtonGroup} from "@mui/material";
import LoupeIcon from "@mui/icons-material/Loupe";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import * as React from "react";


const DataTableButtonGroup = (props) => {
    const view = ( () => alert('view'));
    const edit = ( () => alert('edit'));
    const remove = ( () => alert('delete'));
    return(
    <TableCell align="left">
        <ButtonGroup variant="text" aria-label="outlined button group">
            <Button sx={{outline: "none"}} onClick={view}><LoupeIcon variant="contained" color="info"/></Button>
            <Button sx={{outline: "none"}} onClick={edit}><ModeEditIcon variant="contained" color="warning"/></Button>
            <Button sx={{outline: "none"}} onClick={remove}><DeleteIcon variant="contained" color="error"/></Button>
        </ButtonGroup>
    </TableCell>
    )
}

export default DataTableButtonGroup;