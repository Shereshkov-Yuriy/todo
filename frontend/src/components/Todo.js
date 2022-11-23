import React from 'react';

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

const TodoList = ({ more_todo }) => {
  return (
    <table>
      <th>ID</th>
      <th>Project</th>
      <th>Todo</th>
      <th>Created</th>
      <th>Updated</th>
      <th>User</th>
      <th>Is Closed</th>
      {more_todo.map((todo_) => <TodoItem todo={todo_} />)}
    </table>
  )
}

export default TodoList