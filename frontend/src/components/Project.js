import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, delete_project }) => {
  return (
    <tr>
      <td>{project.id}</td>
      <td>
        <Link to={`/projects/${project.id}`}>{project.title}</Link>
      </td>
      <td>{project.link_repo}</td>
      <td>{project.users}</td>
      <td><button onClick={() => delete_project(project.id)} type="button">Delete</button></td>
    </tr>
  )
}

const ProjectList = ({ projects, delete_project }) => {
  return (
    <div>
      <table>
        <th>ID</th>
        <th>Title</th>
        <th>Link to Repository</th>
        <th>Users</th>
        <th></th>
        {projects.map((project_) => <ProjectItem project={project_} delete_project={delete_project}/>)}
      </table>
      <Link to="/projects/create">Create</Link>
    </div>
  )
}

export default ProjectList