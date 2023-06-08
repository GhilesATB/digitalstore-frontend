export const deleteCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: `api/categories/${payload.id}`,
            method: "DELETE",
            headers: {
                "content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
        }),
        invalidatesTags: ["categories"],
    })
}