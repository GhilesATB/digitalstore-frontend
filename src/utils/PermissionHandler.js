
const permissions = {
  CAN_VIEW:'can-view',
  CAN_EDIT:'can-edit',
  CAN_DELETE:'can-delete',
}
const hasPermission = ({permission}) => {
  return Object.values(permissions).includes(permission);
};

export default function PermissionsGate({
  children,
  permission
}) {
  
  const permissionGranted = hasPermission({ permission });

  if (!permissionGranted) return <></>

  return <>{children}</>;
}