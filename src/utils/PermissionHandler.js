let permissions;
const user = null;

export default function PermissionsGate({
                                            children,
                                            permission
                                        }) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        permissions = {};
    }

    permissions = user?.permissions;

    const hasPermission = permissions?.includes(permission) ?? false;
    if (!hasPermission) return <></>

    return <>{children}</>;
}