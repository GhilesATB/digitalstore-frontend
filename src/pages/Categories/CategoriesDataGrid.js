import {Box, Button, ButtonGroup} from "@mui/material";
import DataTableButtonGroup from "../../components/datatable/dataTableButtongroup";
import {DataGrid, GridColumnMenu, GridToolbar} from '@mui/x-data-grid';
import React from "react";

const CategoriesDataGrid = ({
    categories,
    paginationModel,
    setPaginationModel,
    renderForm,
    remove,
    isLoading,
    filterForm,
    CustomColumnMenu
}) =>{



    const options =  {
        disableColumnMenu: false, 
        sortable: false
    }
    const columns = [
        {
            field: 'name', headerName: 'Name', flex: 1, ...options,
            /*renderHeader: (params) => (
                <strong>
                  {'Birthday '}
                  <span role="img" aria-label="enjoy">
                    🎂
                  </span>
                </strong>
              ),*/
           
            renderCell: (params) => {
                return (
                    <>
                        <Box
                            component="img"
                            sx={{
                                marginRight:'10px',
                                height: 48,
                                width: 48,
                                borderRadius: '50%'
                            }}
                            alt=""
                            src={params.row.thumbnail}
                        />
                        {params.row.name}
                    </>
                );
            }
        },
        {field: 'description', headerName: 'Description', flex: 1,...options,},
        {field: 'created_at', headerName: 'Creation date', flex: 1,...options,},
        {field: 'updated_at', headerName: 'updated date', flex: 1,...options,},
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
            ...options,
            renderCell: (params) => {
                return (
                    <>
                        <Box>
                            <DataTableButtonGroup
                                view={() => renderForm(params?.row?.id, 'view')}
                                edit={() => renderForm(params?.row?.id, 'edit')}
                                remove={() => remove(params?.row?.id)}
                            />
                        </Box>
                    </>
                );
            }
        },
    ];

    return (
        <>

        <DataGrid
            sx={{borderRadius: 0, width:'100%'}}
            componentsProps={
                {
                    panel: {as: filterForm},
                }
            }
            rows={categories?.data}
            /*localeText={{
                toolbarDensity: 'Size',
                toolbarDensityLabel: 'Size',
                toolbarDensityCompact: 'Small',
                toolbarDensityStandard: 'Medium',
                toolbarDensityComfortable: 'Large',
              }}*/
              slots={{
                //toolbar: GridToolbar,
                //panel: filterForm,
                columnMenu: CustomColumnMenu
              }}
            columns={columns}
            rowCount={categories?.meta?.total}
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10, 20, 25]}
            //checkboxSelection
            disableRowSelectionOnClick {...categories?.data}
            onPaginationModelChange={setPaginationModel}
            isLoading={isLoading}
            filterMode="server"
            paginationMode="server"
            keepNonExistentRowsSelected 
        /></>
    );
}

export default CategoriesDataGrid;