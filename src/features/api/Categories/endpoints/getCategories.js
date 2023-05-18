export const categoriesEndpoint = (builder) => {
    return builder.query({
        query: (arg) => {

            arg = {page:1,per_page:10, ...arg}
            return {
                url: "api/categories",
                params: { ...arg },

            }
        },
        providesTags: ["categories"],
        invalidatesTags: ["categories"],
    });
};