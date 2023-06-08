import {toast} from "react-toastify";

export const notifySuccess = (message) => {
    toast.success(message ?? "Element created with success", {
        toastId: "success-notification",
        autoClose: 2000,
    });
};

export const notifyError = (message) =>
    toast.error(message ?? "Something went wrong, please try again later", {
        toastId: "error-notification",
        autoClose: 2000,
    });