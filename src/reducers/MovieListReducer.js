const INITIAL_STATE = [];
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "GET_ALL_MOVIES_SUCCESS" :
            return action.payload;
        default :
            return state;
    }
}