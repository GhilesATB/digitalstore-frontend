import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Paper, Stack } from '@mui/material';
import Dashboard from '../../hoc/DashBoard'
import AuthGuard from '../../utils/HandleAuthentication';
import TopBar from '../Categories/TopBar';

const Profile = () =>{
    const permissions = JSON.parse(localStorage.getItem('user'))?.permissions;

    const permissionsList = permissions.map((el)=>{
        return (
        <Grid item xs={4}>
                <FormControlLabel control={<Checkbox defaultChecked />} label={el.description} />
        </Grid>
        );     
    });

    return (
        <>
        <AuthGuard>
            <Dashboard>
            <Stack spacing={5} sx={{margin: '30px'}}>            
                <TopBar title={"PROFILE"} renderForm={null}/>
                <Paper sx={{padding:'10px', borderRadius:'0px'}}>
                    <Box sx={{display: 'flex'}}>
                        <Box sx={{flex: '1'}}>
                        <img style={{width: "320px", height: "240px", position: "relative", margin: "auto"}}
                                src={ "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" }
                                alt=""
                        />
                        </Box>
                        <Box sx={{flex: '1',paddingLeft:'10px'}}>
                            <Stack spacing={3}>
                                <Box sx={{textAlign: 'left'}}>
                                    Name : name
                                </Box>

                                <Box sx={{textAlign: 'left'}}>
                                    Description :
                                    description
                                </Box>
                                <Box sx={{textAlign: 'left'}}>
                                    email :
                                    user@mail.com
                                </Box>
                                <Box sx={{textAlign: 'left'}}>
                                    type :
                                    Admin
                                </Box>
                                <Box sx={{textAlign: 'left'}}>
                                    type :
                                    Admin
                                </Box>
                            </Stack>
                        </Box>

                        <Box sx={{flex: '1',paddingLeft:'10px'}}>
                            <Stack spacing={3}>
                                <Box sx={{textAlign: 'left'}}>
                                    created at : today
                                </Box>

                                <Box sx={{textAlign: 'left'}}>
                                    updated at :
                                    today
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                <Divider></Divider>
                </Paper>

                <TopBar title={"PERMISSIONS"}/>
                <Paper sx={{borderRadius:'0px'}}>
                <FormGroup>
                <Box sx={{ flexGrow: 1 , margin:'30px 10px'}}>
                <Grid container spacing={5}>
                    {
                       permissionsList
                    }
                    
                </Grid>
                </Box>    
                </FormGroup>
                </Paper>
            </Stack>
            </Dashboard>
        </AuthGuard>
        </>
    );
}

export default Profile;