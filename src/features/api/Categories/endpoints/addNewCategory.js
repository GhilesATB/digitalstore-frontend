import Cookies from "js-cookie";

export const addNewCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (payload) => ({
            url: "api/categories",
            method: "POST",
            body: payload,
            formData: true,
            headers: {
                "content-Type":'application/json',
                "Authorization":"Bearer " + decodeURIComponent(Cookies.get('token')),
            },
        }),
        invalidatesTags: ["categories"],
    });
}