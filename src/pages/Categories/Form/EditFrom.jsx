import * as React from "react";
import {CircularProgress} from "@mui/material";
import {useEditCategoryMutation, useGetCategoryByIdQuery} from "../../../features/api/Categories/categoriesApi";
import {useFormik} from "formik";
import {validation} from "./createSchema";
import {setFormikErrors} from '../../../utils/HandleErrors';
import {notifyError, notifySuccess} from "../../../utils/Notifications";
import BaseForm from "./BaseForm";


const EditCategoryForm = ({handleClose, categoryId}) => {

    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        formik.setFieldValue('image', event.target.files[0]);
        setIsFilePicked(true);
    };
    const cancelFile = () => {
        setSelectedFile(null);
        setIsFilePicked(false);
    }

    const {
        data: category,
        isLoading: isLoadingCategory,
        isSuccess: isSuccessCategoryFetch,
        isError: isErrorCategoryFetch,
        error: errorCategory
    } = useGetCategoryByIdQuery(categoryId);

    const [editCategory] = useEditCategoryMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: category?.data ?? {},
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
            data.set('id', category?.data?.id);

            editCategory(data).unwrap()
                .then(() => {
                    notifySuccess();
                    formik.resetForm();
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

    if (isErrorCategoryFetch) {
        notifyError(errorCategory.data.message);
        handleClose();
    }

    let content = '';

    if (isLoadingCategory) {
        content = <CircularProgress sx={{
            position: "absolute",
            top: "calc(50% - 32px)",
            left: 'calc(50% - 32px)'
        }}
        />
    } else if (!isLoadingCategory && isSuccessCategoryFetch) {
        content = <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <BaseForm
                formik={formik}
                title={"Update category"}
                image={category?.data?.image}
                changeHandler={changeHandler}
                selectedFile={selectedFile}
                isFilePicked={isFilePicked}
                cancelFile={cancelFile}
            />
        </form>;
    }

    return content;
}

export default EditCategoryForm;
