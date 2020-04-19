import React, { useState } from 'react'

const SearchBar = ({ handleSubmit, projects }) => {

    const [searchKey, setSearchKey] = useState("")
    const [search, setSearch]= useState([])
    const [notFound, setNotFound] = useState(false)

    const handleChange = (e) => {
        
        setNotFound(false)

        if(e.target.value.length === 0) {
            setSearchKey("")
            setSearch([])
            handleSubmit([])
        } else {
            setSearchKey(e.target.value)
            let re = RegExp(e.target.value, 'gi')
            setSearch(projects.filter(p => {
                let str = p.authorFirstName+" "+p.authorLastName
                return str.match(re)
            }))
            handleSubmit(search)    
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(search.length === 0) {
            setNotFound(true)
        }
        handleSubmit(search)
    }

    return(
        <form className="col s12" onSubmit={submitHandler}>
                <div className="input-field hoverable z-depth-1">
                    <i className="material-icons white prefix">search</i>
                    <input id="icon_prefix" 
                        type="Search"
                        className="white" 
                        placeholder="Search by Author..."
                        value={searchKey}
                        onChange={handleChange}
                        />    
                </div>
                { notFound? <span className="text-grey darken-1" >Not found!</span> : null }
        </form>
        )
}

export default SearchBar