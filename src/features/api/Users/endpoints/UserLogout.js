import Cookies from "js-cookie";

export const userLogoutEndpoint = (builder) => {
    return builder.query({
        query: () => ({
            url: "api/users/logout",
            method: "POST",
            credentials: 'include',
            headers: {
                "content-Type":'application/json',
                Accept: "application/json",
                "Authorization":"Bearer " + localStorage.getItem('token'),
            },
        }),
        invalidatesTags: ["users"],
    });
}