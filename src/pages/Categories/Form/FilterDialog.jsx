import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, NativeSelect, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

const FilterDialog = ({
    open,
    openDialog,
    closeDialog,
    filter,
}) => {
    const [value,setValue] = React.useState("");
    const [filterValue, setFilterValue] = React.useState("startWith");
    const [field, setField] = React.useState("name");
    const [sort, setSort] = React.useState("asc");

    const handleChange = (e) =>{
        setValue(e.target.value);
    };

    const handleFilterValueChange = (e) =>{
        setFilterValue(e.target.value);
    };

    const handleFieldChange = (e) =>{
        setField(e.target.value);
    };

    const handleSortChange = (e) =>{

        setSort(e.target.value);
    };

    return (
         <div>
            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"select filter options"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">    
                       <Stack spacing={2} sx={{width:'400px'}}>
                        <InputLabel sx={{width:'100%'}} variant="standard" htmlFor="uncontrolled-native">
                            field
                        </InputLabel>
                        <NativeSelect sx={{width:'100%'}}
                        onChange= {(e) => handleFieldChange(e)}
                            defaultValue={filterValue}
                            inputProps={{
                            name: 'filter',
                            id: 'filter-input',
                            }}
                        >
                        <option value={"name"}>name</option>
                        <option value={"description"}>description</option>
                        <option value={"created_at"}>created_at</option>
                        <option value={"updated_at"}>updated_at</option>
                        </NativeSelect>
                        
                    
                        <InputLabel sx={{width:'100%'}} variant="standard" htmlFor="uncontrolled-native">
                            Filter
                        </InputLabel>
                        <NativeSelect sx={{width:'100%'}}
                            onChange= {(e) => handleFilterValueChange(e)}
                                defaultValue={filterValue}
                                inputProps={{
                                name: 'filter',
                                id: 'filter-input',
                                }}
                            >
                        <option value={"startWith"}>startWith</option>
                        <option value={"endWith"}>endWith</option>
                        <option value={"contains"}>contains</option>
                        </NativeSelect>
                    
                        
                        <TextField sx={{width:'100%'}}
                            id="standard-multiline-static"
                            label="Value"
                            name="value"
                            variant="standard"
                            inputProps={{inputMode: "text"}}
                            placeholder="value"
                            InputLabelProps={{shrink: true}}
                            onChange= {(e) => handleChange(e)}
                            />
                        
                    
                        
                            <InputLabel sx={{width:'100%'}} variant="standard" htmlFor="uncontrolled-native">
                                Sort
                            </InputLabel>
                            <NativeSelect sx={{width:'100%'}}
                            onChange= {(e) => handleSortChange(e)}
                                defaultValue={"DESC"}
                                inputProps={{
                                name: 'sort',
                                id: 'sort-input',
                                }}
                            >
                            <option value={"asc"}>ASC</option>
                            <option value={"desc"}>DESC</option>
                        </NativeSelect>
                        </Stack>

                    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="info" onClick={() => filter(field, filterValue,value,sort)}>filter</Button>
                    <Button color="info" onClick={closeDialog} autoFocus>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default FilterDialog;