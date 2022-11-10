import React from 'react';
import axios from 'axios';
import './App.css';
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
    axios.get('http://192.168.1.41:8000/api/authapp/')
    // view the page from the localhost
    // axios.get('http://localhost:8000/api/authapp/')
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))

    // const users = [
    //   {
    //     'username': 'user010',
    //     'first_name': 'Egor',
    //     'last_name': 'Zubov',
    //     'birthday_year': 'zubov.e@ru.ru',
    //   },
    //   {
    //     'username': 'user011',
    //     'first_name': 'Aleks',
    //     'last_name': 'Dedov',
    //     'birthday_year': 'dedov.a@ru.ru',
    //   },
    // ]

    // this.setState(
    //   {
    //     'users': users
    //   }
    // )
  }

  render() {
    return (
      <div>
        <Menu />
        User List
        <UserList users={this.state.users} />
        <Footer />
      </div>
    )
  }
}

export default App;
