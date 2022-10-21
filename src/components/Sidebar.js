import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../firebase';
import { logout as logoutHandle } from '../store/auth';
import "./Sidebar.css";
import logo from "../assets/img/logo.png";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';


export default function Sidebar() {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate('/', {
            replace: true
        })

    }

    if (user) {
        return (
            <>

                <div className="sidebar">
                    <NavLink to="/" end>
                        <img src={logo} alt='logo' className='sidebar_icon' />
                    </NavLink>
                    <div className="sidebar_menu">
                        <NavLink
                            to="/admin-panel"
                            end
                            className="sidebar__menuItem"
                            data-tip="Admin home"
                            data-for="sidebarTooltip"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home"><path d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </NavLink>


                        <div className="div_hr">
                            <hr />
                        </div>

                        <NavLink
                            to="admin-panel/profile"
                            className="sidebar__menuItem"
                            data-tip="Profile"
                            data-for="sidebarTooltip"
                        ><Icon className="sidebar__menuIcon" icon="carbon:user" width="24" />
                        </NavLink>

                        <NavLink
                            to="admin-panel/create-blog"
                            className="sidebar__menuItem"
                            data-tip="Add new post"
                            data-for="sidebarTooltip"
                        ><Icon className="sidebar__menuIcon" icon="ant-design:plus-outlined" width="24" />
                        </NavLink>

                        <NavLink
                            to="admin-panel/update-blog"
                            className="sidebar__menuItem"
                            data-tip="All post"
                            data-for="sidebarTooltip"
                        ><Icon className="sidebar__menuIcon" icon="dashicons:admin-post" width="24" />
                        </NavLink>

                    </div>
                    <NavLink
                        to="/"
                        className="sidebar__menuItem"
                        data-tip="Log out"
                        data-for="sidebarTooltip"
                        onClick={handleLogout}
                    ><Icon className="sidebar__menuIcon" icon="icomoon-free:exit" width="24" />
                    </NavLink>

                </div>


                <div className="mobile_sidebar">
                    <div className="mobile_sidebar_item">
                        <NavLink
                            to="/admin-panel"
                            end
                            className="mobile_sidebar_menuItem"
                        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home"><path d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </NavLink>

                        <NavLink
                            to="admin-panel/profile"
                            className="mobile_sidebar_menuItem"
                        ><Icon className="sidebar__menuIcon" icon="carbon:user" width="24" />
                        </NavLink>

                        <NavLink
                            to="admin-panel/create-blog"
                            className="mobile_sidebar_menuItem"
                        ><Icon className="sidebar__menuIcon" icon="ant-design:plus-outlined" width="24" />
                        </NavLink>

                        <NavLink
                            to="admin-panel/update-blog"
                            className="mobile_sidebar_menuItem"
                        ><Icon className="sidebar__menuIcon" icon="dashicons:admin-post" width="24" />
                        </NavLink>

                        <NavLink
                            className="mobile_sidebar_menuItem"
                            onClick={handleLogout}
                        ><Icon className="sidebar__menuIcon" icon="icomoon-free:exit" width="24" />
                        </NavLink>
                    </div>
                </div>

                <ReactTooltip
                    place="right"
                    className="app__toolTip"
                    id="sidebarTooltip"
                    backgroundColor="var(--text-color)"
                    textColor="var(--black)"
                    effect="solid"
                />
            </>
        )
    }

    return (
        <>
            <div className="sidebar">
                <NavLink to="/" end>
                    <img src={logo} alt='logo' className='sidebar_icon' />
                </NavLink>
                <div className="sidebar_menu">
                    <NavLink
                        to="/"
                        end
                        className="sidebar__menuItem"
                        data-tip="Home"
                        data-for="sidebarTooltip"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home"><path d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </NavLink>

                    <div className="div_hr">
                        <hr />
                    </div>

                    <NavLink
                        to="/blog"
                        className="sidebar__menuItem"
                        data-tip="Blog"
                        data-for="sidebarTooltip"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z" stroke="currentColor"></path><path d="M8 8.5h8M8 15.5h5M8 12h8" stroke="currentColor" strokeLinecap="round"></path></svg>
                    </NavLink>

                </div>
                <div className="of"></div>
                <ReactTooltip
                    place="right"
                    className="app__toolTip"
                    id="sidebarTooltip"
                    backgroundColor="var(--text-color)"
                    textColor="var(--black)"
                    effect="solid"
                />
            </div>



            <div className="mobile_sidebar">
                <div className="mobile_sidebar_item">
                    <NavLink
                        to="/"
                        end
                        className="mobile_sidebar_menuItem"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home"><path d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </NavLink>

                    <NavLink
                        to="/blog"
                        className="mobile_sidebar_menuItem"
                    ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z" stroke="currentColor"></path><path d="M8 8.5h8M8 15.5h5M8 12h8" stroke="currentColor" strokeLinecap="round"></path></svg>
                    </NavLink>
                </div>
            </div>

        </>
    )
}
