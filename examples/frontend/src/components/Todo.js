import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, delete_todo }) => {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.project}</td>
      <td>{todo.todo}</td>
      <td>{todo.created}</td>
      <td>{todo.updated}</td>
      <td>{todo.user}</td>
      <td>{todo.is_closed}</td>
      <td><button onClick={() => delete_todo(todo.id)} 
        type="button">Delete</button></td>
    </tr>
  )
}

const TodoList = ({ more_todo, delete_todo }) => {
  return (
    <div>
      <table>
        <th>ID</th>
        <th>Project</th>
        <th>Todo</th>
        <th>Created</th>
        <th>Updated</th>
        <th>User</th>
        <th>Is Closed</th>
        <th></th>
        {more_todo.map((todo_) => <TodoItem todo={todo_} 
          delete_todo={delete_todo}/>)}
      </table>
      <Link to="/todo/create">Create</Link>
    </div>
  )
}

export default TodoList