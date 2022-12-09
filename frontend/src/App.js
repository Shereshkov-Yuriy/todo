import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {BrowserRouter, Navigate, Route, Routes, Link} from "react-router-dom";
import "./App.css";
import "./components/css/fontawesome.all.min.css";
import "./components/css/bootstrap.min.css";
import LoginForm from "./components/Auth";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import TodoProject from "./components/TodoProject";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

// view the page from the virtualhost
const HOST = "http://192.168.1.41:8000/"
// view the page from the localhost
// const HOST = "http://localhost:8000/"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "users": [],
      "projects": [],
      "more_todo": [],
      "token": "",
    }
  }

  create_todo(project, todo, user) {
    const headers = this.get_headers()
    const urlTodo = `${HOST}api/todo/`
    const dataTodo = { project: project, todo: todo, user: user }
    axios.post(urlTodo, dataTodo, { headers }).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({ "todo": [] })
    })
  }

  delete_todo(id) {
    const headers = this.get_headers()
    const urlTodoId = `${HOST}api/todo/${id}`
    axios.delete(urlTodoId, { headers }).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({ "todo": [] })
    })
  }

  create_project(title, link_repo) {
    const headers = this.get_headers()
    const urlProject = `${HOST}api/projects/`
    const dataProject = {title: title, link_repo: link_repo}
    axios.post(urlProject, dataProject, {headers}).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({"projects": []})
    })
  }

  delete_project(id) {
    const headers = this.get_headers()
    const urlProjectId = `${HOST}api/projects/${id}`
    axios.delete(urlProjectId, {headers}).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({"projects": []})
    })
  }

  logout() {
    this.set_token("")
    this.setState({
      "users": [],
      "projects": [],
      "more_todo": [],
    })
  }

  is_auth() {
    return !!this.state.token
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set("token", token)
    this.setState({"token": token}, () => this.load_data())
  }

  get_token_storage() {
    const cookies = new Cookies()
    const token = cookies.get("token")
    this.setState({"token": token}, () => this.load_data())
  }

  get_token(username, password) {
    const data = {username: username, password: password}
    const url_token = `${HOST}api-token/`
    axios.post(url_token, data).then(response => {
      this.set_token(response.data["token"])
    }).catch(() => alert("Invalid username or password."))
  }

  get_headers() {
    let headers = {
      "Content-Type": "application/json"
    }
    if (this.is_auth()) {
      headers["Authorization"] = "Token " + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    const urlUser = `${HOST}api/users/`
    axios.get(urlUser, {headers}).then(response => {
      this.setState(
        {
          "users": response.data
        }
      )
    }).catch(error => console.log(error))

    const urlProject = `${HOST}api/projects/`
    axios.get(urlProject, {headers}).then(response => {
      this.setState(
        {
          "projects": response.data
        }
      )
    }).catch(error => console.log(error))

    const urlTodo = `${HOST}api/todo/`
    axios.get(urlTodo, {headers}).then(response => {
      this.setState(
        {
          "more_todo": response.data
        }
      )
    }).catch(error => console.log(error))
  }
  

  componentDidMount() {
    this.get_token_storage()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Menu />
            <li>
              {
                this.is_auth()
                ? <button onClick={() => this.logout()}>Logout</button>
                : <Link to='/login'>Login</Link>
              }
            </li>
          </nav>
          <hr />

          <Routes>
            <Route exact path="/users" element={<Navigate to='/'/>}/>
            <Route exact path="/" element={<UserList users={
              this.state.users}/>}/>
            <Route path="/projects">
              <Route index element={<ProjectList projects={this.state.projects} delete_project={(id) => this.delete_project(id)}/>}/>
              <Route path=":projectId" element={<TodoProject more_todo={
                this.state.more_todo}/>}/>
              <Route path="create" element={<ProjectForm create_project={
                (title, link_repo) => this.create_project(title, link_repo)
              }/>}/>
            </Route>
            
            <Route exact path="/todo" element={
              <TodoList more_todo={this.state.more_todo} 
              delete_todo={(id) => this.delete_todo(id)}/>}/>
            <Route exact path="/todo/create" element={
              <TodoForm create_todo={(project, todo, user) => 
              this.create_todo(project, todo, user)}/>}/>
            <Route exact path="/login" element={
              <LoginForm get_token={
                (username, password) => this.get_token(username, password)
              }/>}/>

            <Route path="*" element={<NotFound404/>}/>
          </Routes>
        </BrowserRouter>

        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;