export const categoryByIdEndpoint = (builder) => {
    return builder.query({
        query: (id = '') => {

            if (!id) return ;
            return {
                url: `api/categories/${id}`,
            }
        },
        providesTags: ["categories"],
    });
};