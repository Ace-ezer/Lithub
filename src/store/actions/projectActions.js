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
                    createdAt: new Date(),
                    likedBy: []
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

            dispatch({ type: 'DELETE_SUCCESS' })
        } catch (err) {
            console.log("Delete project error", err)
            dispatch({ type: 'DELETE_FAILURE', err })
        }
    }


export const saveEdit = (pid, content) => async (dispatch, getState, { getFirebase }) => {
        
        const firebase = getFirebase()
        const firestore =  firebase.firestore()

        try {
            await firestore.collection('project').doc(pid).update({
                    content: content,
                    createdAt: new Date()
                })
            dispatch({ type: 'EDIT_PROJECT' })   

        } catch(err) {
            dispatch({ type: 'EDIT_ERROR',  err})
        }
}

export const likeUnlike = (projectId, liked) => async (
    dispatch, 
    getState, 
    { getFirebase }
    ) => {
        const firebase = getFirebase()
        const firestore =  firebase.firestore()
        const userId = getState().firebase.auth.uid

        try {
            const project = await firestore.collection('project').doc(projectId)
            
            if(!liked) {
                await project.update({
                    likedBy: firebase.firestore.FieldValue.arrayUnion(userId)
                })
    
                dispatch({ type: "LIKE_ADDED" })
            } else {
                await project.update({
                    likedBy: firebase.firestore.FieldValue.arrayRemove(userId)
                })
    
                dispatch({ type: "UNLIKED" })
            }

        } catch (err) {
            dispatch({ type: "LIKE_ERROR", err })
        }
}    
