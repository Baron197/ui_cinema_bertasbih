const INITIAL_STATE = { id: 0, title: "", description: "", url: "", image: ""};
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SELECTED_MOVIE" :
            return action.payload;
        case "REFRESH_SELECT_MOVIE":
            return INITIAL_STATE;
        default :
            return state;
    }
}