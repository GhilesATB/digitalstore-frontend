export const addNewCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: "api/categories",
            method: "POST",
            body: payload,
            formData: true,
            headers: {
                "content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
        }),
        invalidatesTags: ["categories"],
    });
}