const createProject = (project) => async (
    dispatch, 
    getState, 
    { getFirebase, getFirestore }
    
    ) => {

        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid

        try {
            firestore.collection('project').add({
                    ...project,
                    authorFirstName: profile.firstName,
                    authorLastName: profile.lastName,
                    authorId: authorId,
                    createdAt: new Date()
                })

                dispatch({ type: 'CREATE_PROJECT',project: project })    

        } catch(err) {
            dispatch({ type: 'CREATE_PROJECT_ERROR',  err})
        }
    }


export default createProject