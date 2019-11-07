//State updates based on the action type
export const OpenPopupReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN":
            return true
        case "CLOSE":
            return false
        default:
            return state;
    }
}
export const AddDataReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD":
            state = action.userData;
            return state;
        case "UPDATE":
            console.log("here");
            return [...state, action.userData]
        case "DELETE":
            return state.filter((item) => !action.userData.includes(item.id))
        default:
            return state;
    }
}