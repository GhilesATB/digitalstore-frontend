import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom';

export const isAuthenticated = () => {
    if(decodeURIComponent(Cookies.get('token'))) {
        return true;
    }

    return false;
};

export const AuthGuard = (props) =>{
    if(!isAuthenticated()){
        return <Navigate to="/auth"/>
    }

    return props.children
}