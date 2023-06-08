import ViewFrom from "./Form/ViewFrom";
import EditForm from "./Form/EditFrom";
import CreateFrom from "./Form/CreateFrom";
import PermissionsGate from "../../utils/PermissionHandler";

const ActionForm = ({handleClose,categoryId, formAction}) =>{
    if(formAction === 'create') {
        return <PermissionsGate permission={'can-create'}> <CreateFrom handleClose={handleClose}/> </PermissionsGate>
    }
    else if(formAction === 'view') {
        return <PermissionsGate permission={'view-category'}><ViewFrom categoryId={categoryId}
                                                                       handleClose={handleClose}/></PermissionsGate>
    }
    else if(formAction === 'edit') {
        return <PermissionsGate permission={'view-category'}><EditForm categoryId={categoryId}
                                                                       handleClose={handleClose}/></PermissionsGate>
    }
};

export default ActionForm;