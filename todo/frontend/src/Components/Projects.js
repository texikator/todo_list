import React from 'react';

const ProjectItem = ({project}) => {
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
                {project.user}
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


const ProjectsList = ({projects}) => {
    return (
        <table>
            <thead>
                <th> Project</th>
                <th> Project Description </th>
                <th> Repositore </th>
                <th> Create Date </th>
                <th> User </th>
                <th> Is Done </th>
                <th> is Deleted </th>
            </thead>
            <tbody>
                 {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </table>
    )

}

export default ProjectsList;