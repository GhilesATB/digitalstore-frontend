import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, NativeSelect, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { setGlobalQuery } from '../../../store/reduces/categories';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../store';

const FilterDialog = ({
    open,
    filter,
}) => {
    const [value,setValue] = React.useState("");
    const [filterValue,setFilterValue] = React.useState("");
    const [openModal, setOpenModal] = React.useState(open);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleChange = (e) =>{
        setValue(e.target.value);
    };

    const handleFilterValueChange = (e) =>{
        setFilterValue(e.target.value);
    };

    return (
         <div>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"select colomn to be filtered"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={2}>
                    <Grid item md={12}>
                       
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
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
                       
                    </Grid>
                    <Grid item md={12}>
                        
                        <TextField
                            sx={{height:"75px", width:"100%"}}
                            id="standard-multiline-static"
                            label="Value"
                            name="value"
                            variant="standard"
                            inputProps={{inputMode: "text"}}
                            placeholder="value"
                            InputLabelProps={{shrink: true}}
                            onChange= {(e) => handleChange(e)}
                            />
                        
                    </Grid>
                    </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="info" onClick={() => filter(filterValue,value)}>filter</Button>
                    <Button color="info" onClick={handleClose} autoFocus>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default FilterDialog;