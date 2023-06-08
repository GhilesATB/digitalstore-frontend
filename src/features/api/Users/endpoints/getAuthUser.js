export const getAuthUser = (builder) => {
    return builder.query({
        query: (payload) => ({
            url: "api/user",
            method: "get",
            body: payload,
            formData: true,
            credentials: 'include',
            headers: {
                "content-Type":'application/json',
                "Authorization":"Bearer " + localStorage.getItem('token'),
            },
        }),
        invalidatesTags: ["users"],
    });
}