export const createProject = (project) => async (
    dispatch, 
    getState, 
    { getFirebase }
    
    ) => {

        const firebase = getFirebase()
        const firestore =  firebase.firestore()
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid

        try {
            await firestore.collection('project').add({
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

export const deleteProject = (projectId) => async (
        dispatch,
        getState,
        { getFirebase }
    ) => {
        const firebase = getFirebase()
        const firestore =  firebase.firestore()
        try {
            const project = await firestore.collection('project').doc(projectId)
            await project.delete()

            dispatch({ type: 'DELETE_SUCCESS', id: projectId })
        } catch (err) {
            console.log("Delete project error", err)
            dispatch({ type: 'DELETE_FAILURE', err })
        }
    }    
