const initState = {
    projects: [
        {id: '1', title: 'title-1', content: 'lorem epsum'},
        {id: '2', title: 'title-2', content: 'lorem epsum'},
        {id: '3', title: 'title-3', content: 'lorem epsum'}
    ]
}

const projectReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREATE_PROJECT': 
            console.log("Project Created");
            return state;            
    
        case 'CREATE_PROJECT_ERROR:':
            console.log("Project Error ", action.err)
            return state;
            
        default:
            return state;
    }
}

export default projectReducer