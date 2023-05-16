export const categoriesEndpoint = (builder) => {
    return builder.query({
        query: () => "api/categories",
        providesTags: ["categories"],
    });
};