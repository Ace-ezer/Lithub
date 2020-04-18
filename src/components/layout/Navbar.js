import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './Signedinlink'
import SignedOutLinks from './Signedoutlink'
import { connect } from 'react-redux'

const Navbar = (props) => {

    const { auth, profile } = props
    const links = auth.uid ? <SignedInLinks auth={auth} profile={profile}/> : <SignedOutLinks />
    return (
        <div className="navbar-fixed">
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo">LitHub</Link>
                    {links} 
                </div>
            </nav> 
        </div> 
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)