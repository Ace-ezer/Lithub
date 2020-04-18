import React, { Component } from 'react'
import Notification from './Notification'
import ProjectList from '../projects/ProjectList'
import { Redirect } from 'react-router-dom'
import Loader from '../assests/Loader'
// Connect to Redux store
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Dashboard extends Component {
    
    render() {
        const { projects, auth, notifications } = this.props

        if(!auth.uid)
            return (<Redirect to='/signin' />)  
    
        const dashboard =  true ? (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notification notifications={notifications}/>
                    </div>
                </div>
            </div>
        ): ( <Loader />)    

        return dashboard 
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.project,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect(() => [
        {collection: 'project', orderBy: ['createdAt', 'desc']},
        {collection: 'notifications', limit: 10, orderBy: ['time', 'desc']}
    ])
    )(Dashboard)