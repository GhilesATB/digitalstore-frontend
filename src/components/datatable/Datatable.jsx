import "./datatable.scss";
import {DataGrid} from "@mui/x-data-grid";
import {userColumns, userRows} from "../../datatablesource";
import {Link} from "react-router-dom";
import {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import DatatableHead from "./dataTableHead";
import DatatableBody from "./datatableBody";
import {TablePagination} from "@mui/material";
import Paper from "@mui/material/Paper";
import * as React from "react";
import DataTableButtonGroup from "./dataTableButtongroup";

//TODO : make reusable datatable
const Datatable = (props) => {
    const data = props.data;
    const headers = props.headers;
    const fields = props.fields;
    const count = props.data.count;
    const perPage = props.data.perPage;
    const page = props.data.page;
    const handleChangePage = props.handleChangePage;
    const handleChangeRowsPerPage = props.handleChangeRowsPerPage;


  return (
      <Paper>
          <TableContainer sx={{maxHeight: "75vh", minHeight: 600, overflowY: "scroll"}}>
              <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                  <DatatableHead headers={headers}/>
                  <DatatableBody data={data} fields={fields}>
                      <DataTableButtonGroup></DataTableButtonGroup>
                  </DatatableBody>
              </Table>
          </TableContainer>

      </Paper>
  )
};

export default Datatable;
