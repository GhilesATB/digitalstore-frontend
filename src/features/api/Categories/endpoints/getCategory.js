export const categoryByIdEndpoint = (builder) => {
    return builder.query({
        query: (id = '') => {

            if (!id) return ;
            return {
                url: `api/categories/${id}`,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                    "accept": "application/json",
                },
            }
            
        },
        providesTags: ["categories"],
    });
};