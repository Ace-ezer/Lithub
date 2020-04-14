const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN_ERROR':
            return { ...state, 
                authError: 'login failed'
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state, authError: null
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR': 
            return {
                ...state,
                authError: action.err.message
            }         
        case 'SIGNOUT_SUCCESS': 
        default:
            return state     
    }
}

export default authReducer