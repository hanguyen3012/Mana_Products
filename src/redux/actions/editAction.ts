export const showEditForm = (data: any) => ({
    type: "SHOW_EDITFROM",
    payload: data
});

export const hideEditForm = () => ({
    type: "HIDE_EDITFROM",
});