export const deleteCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: `api/categories/${payload.id}`,
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ["categories"],
    })
}