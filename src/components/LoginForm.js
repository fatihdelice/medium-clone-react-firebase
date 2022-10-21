import React, { useState } from 'react'
import "./LoginForm.css";
import logo from "../assets/img/logo.png";

export default function LoginForm({ handleSubmit, noEmail = false }) {
    const [email, setEmail] = useState(noEmail ? true : '')
    const [password, setPassword] = useState('')

    const handle = e => {
        handleSubmit(e, email, password)
    }


    return (
        <>
            <div className="login">
                <div className="form">
                    <form className="login-form" onSubmit={handle}>
                        <img src={logo} alt='logo' className='admin_login_icon' />
                        <h4>Welcome to Admin Panel</h4>
                        {!noEmail && (
                        <input
                            type="text"
                            placeholder="E-mail"
                            required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />)}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button disabled={!password} type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
