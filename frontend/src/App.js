import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
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

  logout() {

  }

  is_auth() {

  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set("token", token)
    this.setState({"token": token}, () => this.load_data())
  }

  get_token_storage() {

  }

  get_token(username, password) {
    const data = {username: username, password: password}
    const url_token = "http://192.168.1.41:8000/api-token/"
    axios.post(url_token, data).then(response => {
      this.set_token(response.data["token"])
    }).catch(error => alert("Invalid username or password."))
  }

  get_headers() {

  }

  load_data() {
    // view the page from the host
    const apiUrlUser = "http://192.168.1.41:8000/api/users/"
    // view the page from the localhost
    // const apiUrlUser = "http://localhost:8000/api/users/"
    axios.get(apiUrlUser).then(response => {
      this.setState(
        {
          "users": response.data
        }
      )
    }).catch(error => console.log(error))

    // view the page from the host
    const apiUrlProject = "http://192.168.1.41:8000/api/projects/"
    // view the page from the localhost
    // const apiUrlProject = "http://localhost:8000/api/projects/"
    axios.get(apiUrlProject).then(response => {
      this.setState(
        {
          "projects": response.data
        }
      )
    }).catch(error => console.log(error))

    // view the page from the host
    const apiUrlTodo = "http://192.168.1.41:8000/api/todo/"
    // view the page from the localhost
    // const apiUrlProject = "http://localhost:8000/api/projects/"
    axios.get(apiUrlTodo).then(response => {
      this.setState(
        {
          "more_todo": response.data
        }
      )
    }).catch(error => console.log(error))
  }
  

  componentDidMount() {
    this.load_data()
  }

  render() {
    return (
      <div>
        <BrowserRouter>

          <Menu />
          <hr />

          <Routes>
            <Route exact path="/users" element={<Navigate to='/'/>}/>
            <Route exact path="/" element={<UserList users={this.state.users}/>}/>
            <Route path="/projects">
              <Route index element={<ProjectList projects={this.state.projects}/>}/>
              <Route path=":projectId" element={<TodoProject more_todo={this.state.more_todo}/>}/>
            </Route>
            
            <Route exact path="/todo" element={<TodoList more_todo={this.state.more_todo}/>}/>
            <Route exact path="/login" element={<LoginForm get_token={(username, password) =>
              this.get_token(username, password)}/>}/>

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