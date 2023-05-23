import "./datatable.scss";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import DatatableHead from "./dataTableHead";
import Paper from "@mui/material/Paper";
import * as React from "react";
import DataTableButtonGroup from "./dataTableButtongroup";
import TableBody from "@mui/material/TableBody";
import DataTableRow from "./dataTableRow";

const Datatable = (props) => {

    const data = props.data;
    const headers = props.headers;
    const fields = props.fields;
    const view = props.view;
    const edit = props.edit;
    const remove = props.remove;

    return (
        <>
            <Paper>
                <TableContainer sx={{maxHeight: "75vh", minHeight: 600, overflowY: "scroll"}}>
                    <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                        <DatatableHead headers={headers} fields={fields}/>
                        <TableBody>
                            {data.data.map((row, key) => (
                                <DataTableRow row={row} fields={['Name', 'Description']} key={key}>
                                    <DataTableButtonGroup
                                        view={view}
                                        edit={edit}
                                        remove={remove}
                                    />
                                </DataTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
};

export default Datatable;
