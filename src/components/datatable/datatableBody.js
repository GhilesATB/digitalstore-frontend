import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {cloneElement} from "react";
import DataTableRow from "./dataTableRow";


const dataTableBody = (props) => {
    const data = props.data;
    const fields = props.fields;
    const children = cloneElement(props.children);

    return (
        <TableBody data={data}>

            {data.map((row, key) => (
                <DataTableRow row={row} fields={fields} key={key}>
                    {children}
                </DataTableRow>
            ))}
        </TableBody>
    );
}

export default dataTableBody;