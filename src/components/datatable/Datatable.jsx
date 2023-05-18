import "./datatable.scss";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import DatatableHead from "./dataTableHead";
import DatatableBody from "./datatableBody";
import Paper from "@mui/material/Paper";
import * as React from "react";
import DataTableButtonGroup from "./dataTableButtongroup";

const Datatable = (props) => {

    const data = props.data;
    const headers = props.headers;
    const fields = props.fields;
    const view = props.view;
    const edit = props.edit;
    const remove = props.delete;

    return (
        <Paper>
            <TableContainer sx={{maxHeight: "75vh", minHeight: 600, overflowY: "scroll"}}>
                <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                    <DatatableHead headers={headers}/>
                    <DatatableBody data={data} fields={fields}>
                        <DataTableButtonGroup
                            view={view}
                            edit={edit}
                            delete={remove}
                        />
                    </DatatableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};

export default Datatable;
