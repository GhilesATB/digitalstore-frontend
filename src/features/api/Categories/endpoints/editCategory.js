export const editCategoryEndpoint = (builder) => {
    return builder.mutation({
        query: (category) => ({
            url: `api/categories/${getId(category)}`,
            method: "POST",
            body: category,
            headers: {
                "Accept": "application/json; charset=UTF-8",
            },
        }),
        invalidatesTags: ["category"],
    })
}

const getId = (data) =>{
    return data.get('id');
}