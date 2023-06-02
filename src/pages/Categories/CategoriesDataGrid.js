import {Box} from "@mui/material";
import DataTableButtonGroup from "../../components/datatable/dataTableButtongroup";
import {DataGrid} from '@mui/x-data-grid';


const CategoriesDataGrid = ({categories,paginationModel, setPaginationModel, renderForm, remove}) =>{
    const columns = [
        {
            field: 'name', headerName: 'Name', flex: 1,
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
        {field: 'description', headerName: 'Description', flex: 1},
        {field: 'created_at', headerName: 'Creation date', flex: 1},
        {field: 'updated_at', headerName: 'updated date', flex: 1},
        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,
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
        <DataGrid
            sx={{borderRadius: 0}}
            rows={categories?.data}
            /*localeText={{
                toolbarDensity: 'Size',
                toolbarDensityLabel: 'Size',
                toolbarDensityCompact: 'Small',
                toolbarDensityStandard: 'Medium',
                toolbarDensityComfortable: 'Large',
              }}
              slots={{
                toolbar: GridToolbar,
              }}*/
            columns={columns}
            rowCount={categories?.meta?.total}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 25]}
            checkboxSelection
            disableRowSelectionOnClick {...categories?.data}
        />
    );
}

export default CategoriesDataGrid;