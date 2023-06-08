import Cookies from "js-cookie";

export const editCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (category) => ({
            url: `api/categories/${getId(category)}`,
            method: "POST",
            body: category,
            headers: {
                "content-Type":'application/json',
                "Authorization":"Bearer " + decodeURIComponent(Cookies.get('token')),
            },
        }),
        invalidatesTags: ["categories"],
    })
}

const getId = (data) =>{
    return data.get('id');
}