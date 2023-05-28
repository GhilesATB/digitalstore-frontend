export const editCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (category) => ({
            url: `api/categories/${getId(category)}`,
            method: "POST",
            body: category,
            headers: {
                "Accept": "multipart/form-data;",
            },
        }),
        invalidatesTags: ["category"],
    })
}

const getId = (data) =>{
    return data.get('id');
}