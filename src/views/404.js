import React from 'react'
import { Link } from 'react-router-dom'
import "../components/Page404.css"
import Error from '../assets/img/404_error.svg';

export default function Page404() {
  return (
    <>
      <div className="not_found">
        <img src={Error} alt="404 Not Found" />
        <h4>Page Not Found!</h4>
        <p>Click here to <Link to="/">go home</Link></p>
      </div>
    </>
  )
}

