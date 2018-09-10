const INITIAL_STATE = { id: 0, username: "", email: "", error: "", cookieCheck: false};
    
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USER_LOGIN_SUCCESS" :
            return action.payload;
        case "USER_LOGIN_FAIL" :
            return { ...state, error: "Authentication Error" };
        case "USER_LOGOUT" :
            return { ...INITIAL_STATE, cookieCheck: true };
        case "COOKIES_CHECKED" :
            return { ...state, cookieCheck: true };
        default :
            return state;
    }
}

//catatan
// payload = { index: 1, propsName: "name", value: "Karu" };
// booking : [{ name: "Test"}, { name: "Kool" }, { name: "Helo"}];
// booking[payload.index][payload.propsName] = payload.value;

    