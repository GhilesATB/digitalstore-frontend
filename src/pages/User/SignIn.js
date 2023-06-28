import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Paper} from '@mui/material';
import {notifyError} from '../../utils/Notifications';
import {useLazyGetCsrfTokenQuery, useLazyUserLoginQuery} from '../../features/api/Users/UsersApi';
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {setAuth} from '../../store/reduces/Users';

export const SignIn = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [userLogin, isLoading] = useLazyUserLoginQuery();
    const [getCsrfToken, isLoadingCsrf] = useLazyGetCsrfTokenQuery();


    const formik = useFormik({
    initialValues: {"email":"","password":""},
    onSubmit: (values) => {
      getCsrfToken()
      .then(response => {
        userLogin(values)
            .unwrap()
            .then((response) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                dispatch(setAuth({...response.user, token: response.token, isAuth: true}));
                navigate('/admin');
            })
            .catch((error) => {
                notifyError(error.data.message);
            });
      }).catch((error) => {
        notifyError(error.data.message);
    });
    },
  });

  return (
    <>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:'30px', 
            position:'relative'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            <Box  noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                variant="standard"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={formik.handleChange}
                value={formik?.values?.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                variant="standard"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik?.values?.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Don't have an account?"}
                    <Link href="SignUp" variant="body2">
                        Sign Up
                    </Link>
                    </Link>
                </Grid>
                </Grid>
            </Box>
          </form>
        </Box>
        </Paper>
      </Container>
      </>
  );
}

export default SignIn;