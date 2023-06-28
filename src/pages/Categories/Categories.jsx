import * as React from 'react';
import {Button, ButtonGroup, Stack, Tooltip} from "@mui/material";
import CategoryDrawer from './Drawer';
import {RemoveDialog} from './Form/RemoveDialog';
import CategoriesDataGrid from './CategoriesDataGrid';
import ActionForm from './ActionFom';
import TopBar from './TopBar';
import FilterDialog from './Form/FilterDialog';
import { ListAltOutlined, PictureAsPdf } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export const Categories = ({
    categories,
    paginationModel,
    setPaginationModel,
    isLoading,
    resetPagination,
    setPaginationWithFilters,
    openFilterDialog
}) => {
    const [state, setState] = React.useState(false);
    const [formAction, setFormAction] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [filterOpen, setFilterOpen] = React.useState(openFilterDialog);

    const handleDeleteDialogClickOpen = () => {
        setOpen(true);
    };

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };

    const handleFilterClose = () => {
        setFilterOpen(false);
    };

    const handleDeleteDialogClose = () => {
        setOpen(false);
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

      const filterForm = () =>{
        return (
            <FilterDialog
                open={filterOpen} 
                openDialog = {handleFilterOpen}
                closeDialog = {handleFilterClose}
                filter={setPaginationWithFilters} 
                paginationModel={paginationModel}>
            </FilterDialog>
        )
    }

    return (
        <>
            <RemoveDialog
                open={open}
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
                    <Tooltip><Button onClick={() => renderForm(null, 'create')}><AddIcon/></Button></Tooltip>
                    <Tooltip title="filter"><Button onClick={handleFilterOpen}><FilterAltIcon /></Button></Tooltip>
                        <Button onClick={resetPagination}><Tooltip title="reset filter"><FilterAltOffIcon /></Tooltip></Button>
                        <Tooltip title="order asc"><Button onClick={handleFilterOpen}><ListAltOutlined />asc</Button></Tooltip>
                        <Tooltip title="order desc"><Button onClick={handleFilterOpen}><ListAltOutlined />desc</Button></Tooltip>
                        <Tooltip title="export as pdf"><Button onClick={downloadPdf}><PictureAsPdf/></Button></Tooltip>
                </TopBar>
                <ButtonGroup sx={{float: 'right !important'}} variant="contained">
                   
                </ButtonGroup>
                <div style={{height: '78vh', width: '100%'}}>
                    <CategoriesDataGrid
                        filterForm = {filterForm}
                        categories={categories}
                        paginationModel={paginationModel}
                        setPaginationModel={setPaginationModel}
                        renderForm={renderForm}
                        remove={remove}
                        isLoading={isLoading}
                        filterMode="server"
                    />
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
