export const signIn = (credentials) => async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        
        try {
            await firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password
            )

            dispatch({ type: 'LOGIN_SUCCESS'})

        } catch (err) {
            dispatch({ type: 'LOGIN_ERROR', err })
        }
    }

export const signOut = () => async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        try {
            await firebase.auth().signOut()

            dispatch({ type: 'SIGNOUT_SUCCESS' })

        } catch (err) {
            console.log(err)
        }
    }


export const signUp = (newUser) => async (dispatch, getState, { getFirebase, getFirestore })  => {
        const firebase = getFirebase()
        const firstore = getFirestore()

        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password
                )
            
            await firstore.collection('users').doc(res.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0]+newUser.lastName[0]
            })                

            dispatch({ type: 'SIGNUP_SUCCESS'})    

        } catch (err) {
            dispatch({ type: 'SIGNUP_ERROR', err})
        }
    }
