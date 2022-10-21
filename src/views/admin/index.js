import React from 'react'
import { Outlet } from "react-router-dom"
import "../../components/AdminPanel.css";

export default function AdminLayout() {

    return (
        <>
            <Outlet />
        </>
    )
}