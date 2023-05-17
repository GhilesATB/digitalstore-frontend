import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";

const dataTableHead = (props) => {
    const headers = props.headers;

    return (
        <TableHead>
            <TableRow>
                { headers.map((headers, key) => (<TableCell align="left" key={key}> {headers}</TableCell>)) }
            </TableRow>
        </TableHead>
    );
}

export default dataTableHead;