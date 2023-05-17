import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button, ButtonGroup} from "@mui/material";
import LoupeIcon from "@mui/icons-material/Loupe";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import DataTableButtonGroup from "./dataTableButtongroup";
import DataTableRow from "./dataTableRow";


const dataTableBody = (props) => {
    const data = props.data;
    const fields = props.fields;

    return (
        <TableBody data={data}>
            {data.map((row, key) => (
                <DataTableRow row={row} fields={fields} key={key}/>
            ))}
        </TableBody>
    );
}

export default dataTableBody;