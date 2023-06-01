export const categoriesEndpoint = (builder) => {
    return builder.query({
        query: (arg) => {

            arg = {page: 1, pageSize: 10, ...arg}
            return {
                url: "api/categories",
                params: {...arg},

            }
        },
        providesTags: ["categories"],
    });
};