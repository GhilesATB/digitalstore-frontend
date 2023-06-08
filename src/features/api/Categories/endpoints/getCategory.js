export const categoryByIdEndpoint = (builder) => {
    return builder.query({
        query: (id = '') => {

            if (!id) return ;
            return {
                url: `api/categories/${id}`,
                headers: {
                    "content-Type": 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                },
            }
            
        },
        providesTags: ["categories"],
    });
};