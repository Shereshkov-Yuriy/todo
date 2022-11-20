import React from 'react';

const ProjectItem = ({ project }) => {
  return (
    <tr>
      <td>{project.id}</td>
      <td>{project.title}</td>
      <td>{project.link_repo}</td>
      <td>{project.users}</td>
    </tr>
  )
}

const ProjectList = ({ projects }) => {
  return (
    <table>
      <th>ID</th>
      <th>Title</th>
      <th>Link to Repository</th>
      <th>Users</th>
      {projects.map((project_) => <ProjectItem project={project_} />)}
    </table>
  )
}

export default ProjectList