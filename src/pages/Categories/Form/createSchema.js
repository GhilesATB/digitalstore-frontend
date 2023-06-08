import * as Yup from "yup";

export const formValues = {
    name: "",
    description: "",
    image: "",
};

const MAX_FILE_SIZE = 1;

const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"];

export const validation = () =>
    Yup.object({
        name: Yup.string()
            .required("The name is required")
            .min(3, "The name should be at least 3 caracters"),
        description: Yup.string().nullable().max(65535, "maximum length exceeded"),
        image: Yup.mixed()
            .nullable()
            .notRequired()
        /*.test(
            "FILE_SIZE",
            "Uploaded file is too big.",
            (value) => !value || (value && value.size <= MAX_FILE_SIZE),
        )*/
        /*.test(
            "FILE_FORMAT",
            "Uploaded file has invalid format.",
            (value) => !value || (value && validFileExtensions.includes(value.type))
        ),*/
    });