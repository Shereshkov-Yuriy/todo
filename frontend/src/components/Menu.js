import React from 'react';
import {Link} from "react-router-dom";

const Menu = () => {
  return (
      <nav class="nav">
        <ul>
          <li><Link to='/'>Users</Link></li>
          <li><Link to='/projects'>Projects</Link></li>
          <li><Link to='/todo'>Todo</Link></li>
          {/* <li><Link to='/login'>Login</Link></li> */}
        </ul>
      </nav>
  )
}

export default Menu;