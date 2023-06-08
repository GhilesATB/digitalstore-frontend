import Cookies from "js-cookie";

export const userRegisterEndpoint = (builder) => {
    return builder.query({
        query: (payload) => ({
            url: "api/users/register",
            method: "POST",
            body: payload,
            headers: {
                "content-Type":'application/json',
                accept:'application/json',
                "X-XSRF-TOKEN": decodeURIComponent(Cookies.get('XSRF-TOKEN')),
            },
        }),
        invalidatesTags: ["users"],
    });
}