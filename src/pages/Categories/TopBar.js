import {Box, Button, Divider} from "@mui/material"
import AddBoxIcon from "@mui/icons-material/AddBox";
import PermissionsGate from "../../utils/PermissionHandler";

const TopBar = ({renderForm}) =>{
    return (
    
        <div style={{height: "50px", padding: "15px 0"}}>
            <Box sx={{display:"flex"}}>
                <Box sx={{flex: "1"}}>
                    <Box sx={{margin: "8px 6px", 'text-transform': 'uppercase'}}>
                        Category List
                    </Box>
                </Box>
                <PermissionsGate permission={'can-create'}>
                    <Box sx={{flex: "1"}}>
                        <Button color="success" sx={{"float": "right"}}
                                onClick={() => renderForm(null, 'create')}>
                            <AddBoxIcon variant="contained"/>
                            Add Category
                        </Button>
                    </Box>
                </PermissionsGate>
            </Box>
            <Divider></Divider>
        </div>
    
    );
}

export default TopBar;