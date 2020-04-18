import React from 'react'

export const LikeButton = ({ pid, liked, likeUnlike }) => {

    const handleLike = () => {
        likeUnlike(pid, liked)
    } 

    return (
        <span className="right">
            <button 
            className="waves-effect waves-light btn pink lighten-1 right"
            onClick={handleLike}
            >
            <i className="material-icons right">thumb_up</i>
                { liked ? (<span>Unlike</span> ) : (<span>Like</span>) }
            </button>
        </span>
    )
}

export const DeleteButton = ({ pid, deleteProject}) => {

    const handleDelete = () => {
        if(window.confirm("Are you sure? This action cannot be reversed.")) {
            deleteProject(pid)
        }
    }

    return (
        <button 
            className="waves-effect waves-light btn pink lighten-1 right"
            onClick={handleDelete}
        >
        <i className="material-icons right">delete</i>Delete
        </button>
    )
}

export const EditButton = ({ editEnable, toggleEdit}) => {

    const handleEdit = () => {
        //console.log("Edit me", editEnable)
        toggleEdit(editEnable)
    }

    return (
        <span className="right">
            <button 
            className="waves-effect waves-light btn pink lighten-1 right"
            onClick={handleEdit}
            >
            {!editEnable? (
                <span>
                <i className="material-icons right">note</i>
                    Edit
                </span>) : (
                    <span>
                        <i className="material-icons right">cancel</i>
                        Cancel
                    </span>
                )}
            </button>
        </span>
    ) 
}
