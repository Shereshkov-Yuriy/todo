import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";

class App extends React.Component {
  constructor(props) {
    super(props)
  	this.state = {
	    'users': []
	  }
  }

  componentDidMount() {
    const users = [
      {
        'username': 'user010',
        'first_name': 'Egor',
        'last_name': 'Zubov',
        'birthday_year': 'zubov.e@ru.ru',
      },
      {
        'username': 'user011',
        'first_name': 'Aleks',
        'last_name': 'Dedov',
        'birthday_year': 'dedov.a@ru.ru',
      },
    ]
    this.setState(
      {
        'users': users
      }
    )
  }

  render () {
	  return (
	    <div>
		    Main App
        <UserList users={this.state.users}/>
	    </div>
	  )
  }
}

export default App;
