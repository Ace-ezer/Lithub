const initState = {

}

const projectReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_PROJECT':     
            console.log("Project Created");
            return state;
        case 'DELETE_SUCCESS':
            console.log('Project deleted')
            return state;     
        case 'EDIT_PROJECT':
            console.log('project edited') 
            return {
                ...state
            };
        case 'LIKE_ADDED':
            console.log('like added')
            return state;
        case 'UNLIKED':
            console.log('unliked')
            return state;        
        case 'CREATE_PROJECT_ERROR:':
        case 'DELETE_FAILURE':
        case 'EDIT_ERROR':        
            console.log("Error ", action.err)
            return state;
        case 'LIKE_ERROR':
            console.log('like error', action.err)
            return state;    
        default:
            return state;
    }
}

export default projectReducer