const functions = require('firebase-functions');
const admin  = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log("Notification added", doc))
})

// const createLikeNotification = (notification => {
//     return admin.firestore().collection('likeNotifications')
//         .add(notification)
//         .then(doc => console.log("Like Notification added", doc))
// })

// exports.likedUnliked = functions.firestore
//     .document('/project/{projectId}')
//     .onUpdate((change, context) => {
//         const currentProject = change.after.data()
//         //const prevProject = change.before.data()
//         const likedBy = currentProject.likedBy
//         //const uid = context.auth.uid

//         return console.log(context)
//         // return admin.firestore().collection('users').doc(uid)
//         //     .get().then(doc => {
//         //         const currentUser = doc.data()

//         //         if(Boolean(likedBy.indexOf(uid)+1)) {
//         //             const notification = {
//         //                 content: "liked your project",
//         //                 user: `${currentUser.firstName} ${currentUser.lastName}`,
//         //                 time: admin.firestore.FieldValue.serverTimestamp()
//         //             }
//         //         return  createLikeNotification(notification)
//         //         } else {
//         //             const notification = {
//         //                 content: "unliked your project",
//         //                 user: `${currentUser.firstName} ${currentUser.lastName}`,
//         //                 time: admin.firestore.FieldValue.serverTimestamp()
//         //             }
//         //         return  createLikeNotification(notification)
//         //         }
//         //     })
//     })



exports.projectCreated = functions.firestore
    .document('/project/{projectId}')
    .onCreate(doc => {
        const project = doc.data()
        const notification = {
            content: "added a new project",
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification)
    })

exports.projectRemoved = functions.firestore
    .document('/project/{projectId}')
    .onDelete(doc => {
        const deletedProject = doc.data()
        const notification = {
            content: "removed a project",
            user: `${deletedProject.authorFirstName} ${deletedProject.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()

        }
        return createNotification(notification)
    })    

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid)
        .get().then(doc => {
            const newUser = doc.data()
            const notification = {
                content: "joined the lithub",
                user: `${newUser.firstName} ${newUser.lastName}`,
                time: admin.firestore.FieldValue.serverTimestamp()
            }

            return createNotification(notification)
        })
})



