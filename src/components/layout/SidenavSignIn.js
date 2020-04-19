import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'


const SidenavSignIn = (props) => {

    return (
         <ul className="left">
            <li>
                <NavLink to={'/' } className='btn grey darken-3 z-depth-0' style={{ borderRadius: '50%' }}>
                    {props.profile.initials} 
                </NavLink>
            </li>
            <li>
                <NavLink to='/createproject'>
                 Create Project +
                </NavLink> 
            </li>
            <li>
                <a href='/#projectList'>Projects</a>
            </li>
            <li>
                <a href='/#notifications'>Notification</a>
            </li>
            <li><a href="/" onClick={props.signOut} >Log Out</a></li>
         </ul> 
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SidenavSignIn)