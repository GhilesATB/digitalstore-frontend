import Cookies from "js-cookie";

export const editCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (category) => ({
            url: `api/categories/${getId(category)}`,
            method: "POST",
            body: category,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "accept": "application/json",
            },
        }),
        invalidatesTags: ["categories"],
    })
}

const getId = (data) =>{
    return data.get('id');
}