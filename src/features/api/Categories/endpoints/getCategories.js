export const categoriesEndpoint = (builder) => {
    return builder.query({
        query: (arg) => {

            arg = {page: 1, pageSize: 10, ...arg}
                return {
                    url: "api/categories",
                    params: {...arg},
                    method: "get",
                    Credential: true,
                    headers: {
                        "content-Type": 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    },
            }
        },
        providesTags: ["categories"],
    });
};