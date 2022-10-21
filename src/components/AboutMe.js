import React from 'react';
import "./AboutMe.css";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


export default function AboutMe() {
    return (
        <>
            <div className="about">
                <div className="about_title">
                    <div className="site_author_name">
                        <span>
                            Fatih Delice
                        </span>
                    </div>
                    <nav>
                        <div>
                            <span>
                                <div>
                                    <Link>
                                        <p>
                                            <span>Home</span>
                                        </p>
                                    </Link>
                                </div>
                            </span>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
