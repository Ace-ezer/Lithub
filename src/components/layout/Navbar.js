import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './Signedinlink'
import SignedOutLinks from './Signedoutlink'
import SidenavSignIn from './SidenavSignIn'
import { connect } from 'react-redux'
import M from  'materialize-css/dist/js/materialize.min.js';

const Navbar = (props) => {

    const { auth, profile } = props
    const links = auth.uid ? <SignedInLinks auth={auth} profile={profile}/> : <SignedOutLinks />
    const sidenavLinks = auth.uid ? <SidenavSignIn auth={auth} profile={profile} /> : <SignedOutLinks />

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {  draggable: true });
    })

    return (
        <div>
        <nav className="navbar-fixed">
            <div className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo">LitHub</Link>
                    <span className="right hide-on-med-and-down">{links}</span>
                </div>
                <a href="#!" data-target="slide-out" className="sidenav-trigger hide-on-large">
                    <i className="material-icons">menu</i>
                </a> 
            </div>
        </nav>
        <div id="slide-out" className="sidenav" style={{width: '15rem'}}>
           {sidenavLinks}     
        </div>
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