import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './Signedinlink'
import SignedOutLinks from './Signedoutlink'

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">LitHub</Link>
                <SignedInLinks />
                <SignedOutLinks />
            </div>
        </nav>  
    )
}


export default Navbar