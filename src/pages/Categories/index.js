import "./list.scss"
import Categories from "./Categories";
import * as React from "react";
import {useGetCategoriesQuery} from "../../features/api/Categories/categoriesApi";
import {Box, CircularProgress, Typography} from "@mui/material";
import Dashboard from '../../hoc/DashBoard'
import {WarningSharp} from "@mui/icons-material";
import AuthGuard from "../../utils/HandleAuthentication";
import { useSelector } from "react-redux";
import { setGlobalQuery } from "../../store/reduces/categories";
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ArrowDownward, ArrowUpward, FilterAlt } from "@mui/icons-material";
import { GridColumnMenu } from '@mui/x-data-grid';
import { store } from "../../store";

const CategoryPage = () => {

    const currentQuery = useSelector(state => state.categories.request);
    const [queryOptions, setQueryOptions] = React.useState({});
    const [paginationModel, setPaginationModel] = React.useState({page: 0, pageSize: 10 });
    const [request, setRequest] = React.useState({...paginationModel,...currentQuery});
    const [open, setOpen] = React.useState(false);

    React.useEffect(() =>(
        setRequest({...request,page:paginationModel.page, pageSize:paginationModel.pageSize})
    ),[paginationModel]);

    const setPaginationWithFilters = ({field, operator,value,sort}) => {
        setRequest({...request,page:paginationModel.page, pageSize:paginationModel.pageSize})
         //fix this check why on footer page change value is equal to pagination {page, pageSize}
         
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


        /* menu header*/

        const CustomUserItem = (props) => {
            const asc = "ASC";
            const desc = "DESC";
    
            const { filterHandler, SortHandlerAsc,SortHandlerDesc} = props;
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
                      filterHandler: () => setOpen(true),
                      SortHandlerAsc: () =>  setRequest({...request,field:props.colDef.field,sort:"asc"}),
                      SortHandlerDesc: () => setRequest({...request,filed:props.colDef.field,sort:"desc"}),
                    },
                  }}
              />
            );
          }
    
        /*end*/

        
    //create a filter button to query when filtering is done
    
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery({pagination:paginationModel, filter:request});

    return (
        <AuthGuard>
            <Dashboard>
                {isLoading ?
                    <CircularProgress sx={{
                        position: "absolute",
                        top: "calc(50% - 32px)",
                        left: 'calc(50vw - 32px)'
                    }}
                    /> : ""}
                {isSuccess ?
                <>
                    <Categories
                        CustomColumnMenu = {CustomColumnMenu}
                        request= {request}
                        openFilterDialog={open}
                        categories={categories}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        isError={isError}
                        error={error}
                        paginationModel={paginationModel}
                        setPaginationModel={setPaginationModel}
                        setPaginationWithFilters = {setPaginationWithFilters}
                        resetPagination = {resetPagination}
                        filterMode="server"
                    /></>: ""
                }
                {isError ?
                    <>
                        <Box>
                            <WarningSharp
                                color="error"
                                sx={{
                                    position: "absolute",
                                    top: "calc(50% - 160px)",
                                    left: 'calc(50vw - 160px)',
                                    fontSize: '300px',
                                }}
                            >;
                            </WarningSharp>

                            <Typography color="primary" variant="h6" component="h6" sx={{
                                position: "absolute",
                                top: "calc(85% - 160px)",
                                left: 'calc(50vw - 200px)',
                            }}>
                                Something went wrong please try again later
                            </Typography></Box></> : ""
                }

            </Dashboard>
        </AuthGuard>
    )
}

export default CategoryPage