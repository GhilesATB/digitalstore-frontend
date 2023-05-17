import DataTableButtonGroup from "./dataTableButtongroup";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import TableCell from "@mui/material/TableCell";

const DataTableRow = (props) => {
    const dataFields = Object.keys(props.row)
    const displayedFields = props.fields.filter(function (n) {
        return dataFields.indexOf(n.toLowerCase()) !== -1;
    });

    const firstToUpper = (string) => {
        return string.charAt(0).toUpperCase()
            + string.slice(1)
    };
    const isDisplayable = (field) => (displayedFields.indexOf(firstToUpper(field)) !== -1)

    const cellRender = (row) => (
        Object.entries(row).map((value, key) => (
            isDisplayable(value[0]) ? <TableCell component="th" scope="row">{value[1]}</TableCell> : ''
        ))
    );

    return (
        <TableRow>{cellRender(props.row)}<DataTableButtonGroup/>
        </TableRow>
    );
}

export default DataTableRow;
