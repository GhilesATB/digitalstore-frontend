
export const setFormikErrors = (formik,errors ) => {
    Object.entries(errors).forEach(entry => {
    const [key, value] = entry;
    formik.setFieldError(key, value);
  });
}