export const categoriesEndpoint = (builder) => {
    return builder.query({
        query: (arg) => {

            
            let {pagination, filter} = arg

                return {
                    url: "api/categories",
                    params: {...pagination,...filter?? null},
                    method: "get",
                    Credential: true,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                        "accept": "application/json",
                    },
            }
        },
        providesTags: ["categories"],
    });
};