
const permissions = [
    "view-store",
    "view-products",
    "create-products",
    "edit-products",
    "delete-products",
    "view-category",
    "create-category",
    "edit-category",
    "delete-category",
    "view-accounts",
    "view-role",
    "create-role",
    "edit-role",
    "delete-role",
    "view-permission",
    "assign-permission",
];

export default function PermissionsGate({children, permission}) {
    
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        permissions = {};
    }

    const permissions = user?.permissions;
    
    let permissionsArray = [];
    permissions.map((value) => Object.values(value).map((subValue) => permissionsArray.push(subValue)));
    const hasPermission = permissionsArray?.includes(permission) ?? false;
    if (!hasPermission) return <></>

    return <>{children}</>;
}