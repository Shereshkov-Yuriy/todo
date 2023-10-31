import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound404 = () => {
  let {pathname} = useLocation()
  return (
    <div>
      <h1>Page '{pathname}' Not Found. 404 Error.</h1>
    </div>
  )
}

export default NotFound404;