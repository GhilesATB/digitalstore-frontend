import {Navigate} from 'react-router-dom'


export const isAuthenticated = () => {
    const token = localStorage.getItem('token') ?? null;

    if (token === 'undefined' || token === null) {
        return false;
    }

    return true;
};

export const AuthGuard = (props) => {

    if (!isAuthenticated()) {
        return <><Navigate replace to={'/login'}/></>;
    }

    return props.children
}

export default AuthGuard;