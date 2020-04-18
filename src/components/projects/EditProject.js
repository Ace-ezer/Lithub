import React, { useState } from 'react'

const EditProject = ({ pid, prevContent, editEnable, saveEdit}) => {

    const [content, setState] = useState(prevContent)

    console.log(prevContent)

    const handleChange = (e) => {
        setState(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveEdit(pid, content, editEnable)
    }

    return (
        <form onSubmit={handleSubmit} className="white">
                <div className="input-field">
                    
                    <textarea 
                        id="content" 
                        className="materialize-textarea" 
                        onChange={handleChange} 
                        value={content}
                        required/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Save edit</button>
                </div>
        </form>
    )
}

export default EditProject
