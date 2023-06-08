

export default function PermissionsGate({children, permission}) {
    let permissions;
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        permissions = {};
    }

    permissions = user?.permissions;

    const hasPermission = permissions?.includes(permission) ?? false;
    if (!hasPermission) return <></>

    return <>{children}</>;
}