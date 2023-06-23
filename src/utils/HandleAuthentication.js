import {Navigate} from 'react-router-dom'


export const isAuthenticated = () => {
    const token = localStorage.getItem('token') ?? null;

    return !(token === 'undefined' || token === null);


};

export const AuthGuard = (props) => {

    //TODO : handle unauthorized exception
    if (!isAuthenticated()) {
        return <><Navigate replace to={'/login'}/></>;
    }

    return props.children
}

export default AuthGuard;