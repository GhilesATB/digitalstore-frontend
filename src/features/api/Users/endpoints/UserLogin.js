import Cookies from "js-cookie";

export const userLoginEndpoint = (builder) => {
    return builder.query({
        query: (payload) => ({
            url: "api/users/login",
            method: "POST",
            body: payload,
            formData: true,
            credentials: 'include',
            headers: {
                "content-Type":'application/json',
                "X-XSRF-TOKEN": decodeURIComponent(Cookies.get('XSRF-TOKEN')),
            },
        }),
        invalidatesTags: ["users"],
    });
}