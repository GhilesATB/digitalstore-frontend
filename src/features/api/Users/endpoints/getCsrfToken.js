export const getCsrfTokenEndpoint = (builder) => {
    return builder.query({
        query: (args) => ({
          url: "sanctum/csrf-cookie",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }),
        transformResponse: (apiResponse, meta, arg) => {
        
        return meta;
      },
        invalidatesTags: ["users"],
    });
}