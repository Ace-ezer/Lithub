import React from 'react'

function ProjectDetails(props) {

    const id = props.match.params.id

    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project title - {id}</span>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dignissimos. Laborum est quidem modi officia, nulla corporis delectus neque, voluptas soluta veniam dolorem! Esse quos natus recusandae quasi, eius tempore.</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by me</div>
                    <div>2nd September, 2am</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
