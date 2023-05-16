export const editCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: `api/categories/${payload.id}`,
            method: "PUT",
            body: payload,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ["categories"],
    })
}