import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect }  from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'

function ProjectDetails(props) {

    //const id = props.match.params.id
    const { id, project, auth, deleteProject } = props;

    if(!auth.uid)
        return (<Redirect to='/signin' />)    

    const handleClick = () => {
        if(window.confirm("Are you sure? This action cannot be reversed.")) {
            deleteProject(id)
        }
        else console.log("rejected it")    
    }
    
    const deleteButton = project && auth.uid === project.authorId? (
        <button 
            className="waves-effect waves-light btn pink lighten-1 right"
            onClick={handleClick}
        >
        <i className="material-icons right">delete</i>Delete
        </button>

    ) : (null)

    const display = project ? (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">
                        {project.title}
                        { deleteButton }
                    </span>
                    <p>{project.content}</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                    <div>{moment(project.createdAt.toDate()).calendar()}</div>
                </div>
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
    const id = ownProps.match.params.id
    const projects = state.firestore.data.project
    const project = projects ? projects[id]: undefined

    return {
        id: id,
        project: project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: projectId => dispatch(deleteProject(projectId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'project'}
    ])
    )(ProjectDetails)