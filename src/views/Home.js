import React from 'react'
import AboutMe from '../components/AboutMe';
import RecentPosts from '../components/RecentPosts';
import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Fatih Delice - Medium Clone</title>
            </Helmet>
            <AboutMe />
            <RecentPosts />
        </>
    )
}
