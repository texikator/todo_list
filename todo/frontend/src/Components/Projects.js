import React from 'react';

const ProjectItem = ({project, users}) => {

    return (
        <tr>
            <td>
                {project.projectName}
            </td>
            <td>
                {project.projectDescription}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.createDate}
            </td>
            <td>

                {project.user.map((userID) => {
                    let currentUser = users.find(user => user.id === userID)
                        return ( <div className="new-line">
                                     {currentUser.firstName + " " + currentUser.lastName}
                                  </div>)
                })}
            </td>
            <td>
                {project.isDone ? ("Yes") : ("No")}
            </td>
            <td>
                {project.isDeleted ? ("Yes") : ("No")}
            </td>
        </tr>
    )
}

const ProjectsList = ({projects, users}) => {


    return (
        <table>
            <thead>
               <tr>
                    <th> Project</th>
                    <th> Project Description </th>
                    <th> Repositore </th>
                    <th> Create Date </th>
                    <th> User </th>
                    <th> Is Done </th>
                    <th> is Deleted </th>
                </tr>
            </thead>
            <tbody>
                 {projects.map((project) => <ProjectItem project={project} users={users} />)}
            </tbody>
        </table>
    )

}

export default ProjectsList;