import * as React from "react";
import {useAddNewCategoryMutation} from "../../../features/api/Categories/categoriesApi";
import {useFormik} from "formik";
import {formValues, validation} from "./createSchema";
import {notifyError, notifySuccess} from '../../../utils/Notifications';
import {setFormikErrors} from '../../../utils/HandleErrors';
import BaseForm from "./BaseForm";


const CreateCategoryForm = ({handleClose}) => {

    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        formik.setFieldValue('image', event.target.files[0]);
        setIsFilePicked(true);
    };

    const cancelFile = () => {
        setSelectedFile(null)
        setIsFilePicked(false);
    }


    const [addNewCategory, {isLoading}] = useAddNewCategoryMutation();

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values) => {

            let data = new FormData();
            Object.entries(values).forEach(entry => {
                const [key, value] = entry;
                data.append(key, value);
            });

            if (selectedFile) {
                data.set('image', selectedFile);
            } else {
                data.delete('image');
            }

            addNewCategory(data)
                .unwrap()
                .then(() => {
                    notifySuccess();
                    handleClose();
                })
                .catch((error) => {
                    if (error.status === 422) {
                        setFormikErrors(formik, error.data.errors);

                    } else {
                        notifyError(error.data.message);
                        handleClose();
                    }

                });
        },
      });

    return (<form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <BaseForm
            formik={formik}
            title={"Update category"}
            image={null}
            changeHandler={changeHandler}
            selectedFile={selectedFile}
            isFilePicked={isFilePicked}
            cancelFile={cancelFile}
        />
    </form>);

}

export default CreateCategoryForm;
