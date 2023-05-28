export const addNewCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: "api/categories",
            method: "POST",
            body: payload,
            formData: true,
            headers: {
                "Accept": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ["category"],
    });
}