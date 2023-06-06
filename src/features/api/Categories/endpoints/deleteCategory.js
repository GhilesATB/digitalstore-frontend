import Cookies from "js-cookie";

export const deleteCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: `api/categories/${payload.id}`,
            method: "DELETE",
            headers: {
                "content-Type":'application/json',
                "Authorization":"Bearer " + decodeURIComponent(Cookies.get('token')),
            },
        }),
        invalidatesTags: ["categories"],
    })
}