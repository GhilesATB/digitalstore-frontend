export const deleteCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: `api/categories/${payload.id}`,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "accept": "application/json",
            },
        }),
        invalidatesTags: ["categories"],
    })
}