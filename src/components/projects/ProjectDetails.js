import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect }  from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject, likeUnlike, toggleEdit, saveEdit } from '../../store/actions/projectActions'
import { LikeButton, DeleteButton, EditButton } from '../layout/Buttons'
import EditProject from './EditProject'

function ProjectDetails({ pid, project, 
        auth, deleteProject, 
        likeUnlike, liked, 
        editEnable, toggleEdit,
        saveEdit 
    }) {

    //const id = props.match.params.id

    if(!auth.uid)
        return (<Redirect to='/signin' />)    
    
    const deleteButton = project && auth.uid === project.authorId? (
        <DeleteButton pid={pid} deleteProject={deleteProject} />
    ) : (null)

    const likeButton = project && auth.uid !== project.authorId? (
        <LikeButton pid={pid} liked={liked} likeUnlike={likeUnlike}/> ) : (null)

    const editButton = project && auth.uid === project.authorId? (
       <EditButton editEnable={editEnable} toggleEdit={toggleEdit} /> 
    ) : (null)

    const content = project && !editEnable ? <p>{project.content}</p> : (
        <EditProject pid={pid} 
            prevContent={project? project.content : null}
            editEnable={editEnable}
            saveEdit={saveEdit}
        />
    )

    const display = project ? (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">
                        {project.title}
                        {editButton}
                        {likeButton}
                    </span>
                    {content}
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>
                        Posted by {project.authorFirstName} {project.authorLastName}
                    </div>
                    <div>
                        {moment(project.createdAt.toDate()).calendar()}
                        <span className="right">Likes: {project.likedBy.length}</span>
                    </div>
                </div>
                <span className="right">{deleteButton}</span>
            </div>
        </div>
    ) : project === undefined? (
        <div className="center">
            <p>Loading projects...</p>
        </div>
    ) : (
        <Redirect to="/" />
    )

    return (
        <div>
            {display}
        </div>
        )
}

const mapStateToProps = (state, ownProps) => {
    const pid = ownProps.match.params.pid
    const projects = state.firestore.data.project
    const project = projects ? projects[pid]: undefined
    const likedBy = project ? project.likedBy: undefined
    const liked = likedBy ? Boolean(likedBy.indexOf(state.firebase.auth.uid)+1) : false

    return {
        pid: pid,
        project: project,
        auth: state.firebase.auth,
        liked: liked,
        editEnable: state.project.editEnable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: projectId => dispatch(deleteProject(projectId)),
        likeUnlike: (projectId, liked) => dispatch(likeUnlike(projectId, liked)),
        toggleEdit: value => dispatch(toggleEdit(value)),
        saveEdit: (projectId, content, value) => dispatch(saveEdit(projectId, content, value))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'project'}
    ])
    )(ProjectDetails)