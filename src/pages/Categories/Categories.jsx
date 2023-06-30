import * as React from 'react';
import {Button, ButtonGroup, Stack, Tooltip} from "@mui/material";
import CategoryDrawer from './Drawer';
import {RemoveDialog} from './Form/RemoveDialog';
import CategoriesDataGrid from './CategoriesDataGrid';
import ActionForm from './ActionFom';
import TopBar from './TopBar';
import FilterDialog from './Form/FilterDialog';
import {PictureAsPdf } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";
import { useSelector } from "react-redux";
import { setGlobalQuery } from "../../store/reduces/categories";
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ArrowDownward, ArrowUpward, FilterAlt } from "@mui/icons-material";
import { GridColumnMenu } from '@mui/x-data-grid';
import { store } from "../../store";

export const Categories = () => {
    
    const [state, setState] = React.useState(false);
    const [formAction, setFormAction] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [filterOpen, setFilterOpen] = React.useState(false);
    const currentQuery = useSelector(state => state.categories.request);
    const [paginationModel, setPaginationModel] = React.useState({page: 0, pageSize: 10 });
    const [request, setRequest] = React.useState({...paginationModel,...currentQuery});
    const [open, setOpen] = React.useState(false);

    
    const handleDeleteDialogClickOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };

    const handleFilterClose = () => {
        setFilterOpen(false);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const renderForm = (categoryId, formAction) => {
        setCategoryId(categoryId);
        setFormAction(formAction);
        setState(true);
    }

    const close = () => {
        return setState(false);
    }

    const remove = (id) => {
        setCategoryId(id)
        handleDeleteDialogClickOpen();
    }

    
    const setPaginationWithFilters = ({field, operator,value,sort}) => {
        setRequest({...request,page:paginationModel.page, pageSize:paginationModel.pageSize})
         
         if(value){
            store.dispatch(setGlobalQuery({...request, field:field,operator:operator,value:value,sort:sort,page:paginationModel.page, pageSize:paginationModel.pageSize}));
            setRequest({...request, field:field,operator:operator,value:value,sort:sort,page:paginationModel.page, pageSize:paginationModel.pageSize});
        } else {
            const { data } = request || '';

            if(data){
                setRequest({...request, field:field, operator:operator,value:value,sort:sort,page:paginationModel.page, pageSize:paginationModel.pageSize});
            } else {
                setRequest({page:paginationModel.page, pageSize:paginationModel.pageSize});
            }
        }

        setOpen(false);
    };
    

    const resetPagination = () => {
        setRequest({page:paginationModel.page, pageSize:paginationModel.pageSize});
    };
    
    const filterForm = () =>{
        return (
            <FilterDialog
                open={filterOpen} 
                openDialog = {handleFilterOpen}
                closeDialog = {handleFilterClose}
                filter={setPaginationWithFilters} 
            >
            </FilterDialog>
        )
    }
    const CustomUserItem = ({ filterHandler,SortHandlerAsc,SortHandlerDesc}) => {    
        return (
            <>
            <MenuItem onClick={filterHandler}>
            <ListItemIcon>
                <FilterAlt fontSize="small" />
            </ListItemIcon>
            <ListItemText>Filter</ListItemText>
            </MenuItem>

            <MenuItem onClick={SortHandlerAsc}>
            <ListItemIcon>
            <ArrowUpward fontSize="small" />
            </ListItemIcon>
            <ListItemText>Order ASC</ListItemText>
            </MenuItem>

            <MenuItem onClick={SortHandlerDesc}>
            <ListItemIcon>
            <ArrowDownward fontSize="small" />
            </ListItemIcon>
            <ListItemText>Order DESC</ListItemText>
            </MenuItem>
            </>
        );
    }
        
    const CustomColumnMenu = (props) => {
        return (
            <GridColumnMenu
            {...props}
            slots={{
                // Hide `columnMenuColumnsItem`
                columnMenuColumnsItem: null,
                columnMenuFilterItem: null,
                columnMenuUserItem: CustomUserItem,
            }}
            slotProps={{
                columnMenuUserItem: {
                    // set `displayOrder` for new item
                    displayOrder: 15,
                    // pass additional props
                    filterHandler: () => setFilterOpen(true),
                    SortHandlerAsc: () =>  setRequest({...request,field:props.colDef.field,sort:"asc"}),
                    SortHandlerDesc: () => setRequest({...request,filed:props.colDef.field,sort:"desc"}),
                },
                }}
            />
        );
    }
    
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery({pagination:paginationModel, filter:request});


    return (
        <>
            <RemoveDialog
                open={openDeleteDialog}
                handleClickOpen={handleDeleteDialogClickOpen}
                handleClose={handleDeleteDialogClose}
                categoryId={categoryId}
                />
            <CategoryDrawer
                anchor={'right'}
                close={close}
                open={state}
            >
                <ActionForm
                    handleClose={close}
                    categoryId={categoryId}
                    formAction={formAction}
                />
            </CategoryDrawer>

            <Stack spacing={5} sx={{margin: '30px'}}>
                <TopBar title = {"CATEGORY LIST"} renderForm={renderForm}>
                    
                <ButtonGroup sx={{float: 'right !important'}} variant="contained">
                <Tooltip title="new user"><Button onClick={() => renderForm(null, 'create')}><AddIcon/></Button></Tooltip>
                    <Button onClick={resetPagination}><Tooltip title="reset filter"><FilterAltOffIcon /></Tooltip></Button>
                    <Tooltip title="export as pdf"><Button onClick={downloadPdf}><PictureAsPdf/></Button></Tooltip>
                </ButtonGroup>
                </TopBar>
                <div style={{height: '78vh', width: '100%'}}>
                    {
                        isSuccess ? <CategoriesDataGrid
                        CustomColumnMenu = {CustomColumnMenu}
                        filterForm = {filterForm}
                        categories={categories}
                        paginationModel={paginationModel}
                        setPaginationModel={setPaginationWithFilters}
                        renderForm={renderForm}
                        remove={remove}
                        filterMode="server"
                    />: ''
                    }
                    
                </div>
            </Stack>
        </>
    );
}

export default Categories;

async function downloadPdf() {
    const url ='http://127.0.0.1:8000/api/categories/download';
    const authHeader ="Bearer " + localStorage.getItem('token'); 
    
    const options = {
      headers: {
        Authorization: authHeader,
      }
    };
    fetch(url, options)
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "filename.pdf";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         
    });
}
