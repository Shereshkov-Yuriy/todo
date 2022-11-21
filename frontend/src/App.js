import React from 'react';
import axios from 'axios';
import {BrowserRouter, Redirect, Route, Routes, Switch} from "react-router-dom";
import './App.css';
import './components/css/fontawesome.all.min.css';
import './components/css/bootstrap.min.css';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'more_todo': [],
    }
  }

  componentDidMount() {
    // view the page from the host
    const apiUrlUser = "http://192.168.1.41:8000/api/users/"
    // view the page from the localhost
    // const apiUrlUser = "http://localhost:8000/api/users/"
    axios.get(apiUrlUser).then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))

    // view the page from the host
    const apiUrlProject = "http://192.168.1.41:8000/api/projects/"
    // view the page from the localhost
    // const apiUrlProject = "http://localhost:8000/api/projects/"
    axios.get(apiUrlProject).then(response => {
        const projects = response.data
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))

    // view the page from the host
    const apiUrlTodo = "http://192.168.1.41:8000/api/todo/"
    // view the page from the localhost
    // const apiUrlProject = "http://localhost:8000/api/projects/"
    axios.get(apiUrlTodo).then(response => {
        const more_todo = response.data
        this.setState(
          {
            'more_todo': more_todo
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <BrowserRouter>

          <Menu />
          <hr />

          <Routes>
            <Route exact path='/' element={<UserList users={this.state.users}/>} />
            <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>} />
            <Route exact path='/todo' element={<TodoList more_todo={this.state.more_todo}/>} />

            <Route path='*' element={<NotFound404/>}/>
          </Routes>
        </BrowserRouter>

        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;