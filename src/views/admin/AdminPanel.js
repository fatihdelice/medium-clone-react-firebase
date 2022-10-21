import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import "../../components/AdminPanel.css";

export default function AdminPanel() {
    const { user } = useSelector(state => state.auth)


    if (user) {
        return (
            <>
                <div className="admin_panel">
                    <div className="admin_panel_title">
                        <h1>Welcome, {user.displayName} <span>({user.email})</span></h1>
                        <p>
                            This is your Dashboard. Manage your blogs and profile.
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return <Navigate to="/" />
}
