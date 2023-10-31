import React from 'react';
import { useParams } from 'react-router-dom';

const TodoItem = ({ todo }) => {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.project}</td>
      <td>{todo.todo}</td>
      <td>{todo.created}</td>
      <td>{todo.updated}</td>
      <td>{todo.user}</td>
      <td>{todo.is_closed}</td>
    </tr>
  )
}

const TodoProject = ({ more_todo }) => {
  let {projectId} = useParams()
  let filter_more_todo = more_todo.filter((todo) => todo.project == parseInt(projectId))
  return (
    <table>
      <th>ID</th>
      <th>Project</th>
      <th>Todo</th>
      <th>Created</th>
      <th>Updated</th>
      <th>User</th>
      <th>Is Closed</th>
      {filter_more_todo.map((todo_) => <TodoItem todo={todo_} />)}
    </table>
  )
}

export default TodoProject