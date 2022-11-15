import React from 'react';
import axios from 'axios';
import './App.css';
import './components/css/fontawesome.all.min.css';
import './components/css/bootstrap.min.css';
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
    }
  }

  componentDidMount() {
    // view the page from the host
    const apiUrl = "http://192.168.1.41:8000/api/users/"
    // view the page from the localhost
    // const apiUrl = "http://localhost:8000/api/users/"
    axios.get(apiUrl)
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Menu />
        <hr />
        User List
        <UserList users={this.state.users} />
        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;