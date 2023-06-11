export const addNewCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: "api/categories",
            method: "POST",
            body: payload,
            formData: true,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "accept": "application/json",
            },
        }),
        invalidatesTags: ["categories"],
    });
}