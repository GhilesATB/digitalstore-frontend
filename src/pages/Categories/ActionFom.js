import ViewFrom from "./Form/ViewFrom";
import EditForm from "./Form/EditFrom";
import CreateFrom from "./Form/CreateFrom";

const ActionForm = ({handleClose,categoryId, formAction}) =>{
    if(formAction === 'create') 
    {return <CreateFrom handleClose={handleClose}/>}
    else if(formAction === 'view') 
    { return <ViewFrom categoryId={categoryId} handleClose={handleClose}/>}
    else if(formAction === 'edit')
    { return <EditForm categoryId={categoryId} handleClose={handleClose}/>}
};

export default ActionForm;