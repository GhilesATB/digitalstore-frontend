export const addNewCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: "api/categories",
            method: "POST",
            body: payload,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ["categories"],
    });
}