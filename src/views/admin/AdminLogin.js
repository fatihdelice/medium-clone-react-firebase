import React from 'react'
import { login } from "../../firebase";
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/LoginForm'

export default function AdminLogin() {
    const navigate = useNavigate()

    const handleSubmit = async (e, email, password) => {
        e.preventDefault()
        const user = await login(email, password)
        if (user) {
            navigate('/admin-panel', {
                replace: true
            })
        }
    }

    return (
        <>
            <LoginForm handleSubmit={handleSubmit} />
        </>
    )
}
