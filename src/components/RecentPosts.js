import React from 'react'
import "./BlogPost.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import getReadTime from './ReadTime';
import toast from 'react-hot-toast';
import ReactTooltip from "react-tooltip";

export default function RecentPosts() {


    const { recent } = useSelector(state => state.recent);
    return (
        <>
            <div className="post_featured">
                <ul className="blog_list">
                    {recent.map(post => (
                        <li key={post.id}>
                            <div className="post_item">
                                <div className="post_date">
                                    <p>
                                        {new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                    <div className="new_post">
                                        <p>{
                                            ((new Date().getTime() - post.createdAt.toDate().getTime()) / (1000 * 3600 * 24)) < 7 ?
                                                <span className="new_date"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="io"><path d="M12.4 12.77l-1.81 4.99a.63.63 0 0 1-1.18 0l-1.8-4.99a.63.63 0 0 0-.38-.37l-4.99-1.81a.62.62 0 0 1 0-1.18l4.99-1.8a.63.63 0 0 0 .37-.38l1.81-4.99a.63.63 0 0 1 1.18 0l1.8 4.99a.63.63 0 0 0 .38.37l4.99 1.81a.63.63 0 0 1 0 1.18l-4.99 1.8a.63.63 0 0 0-.37.38z" fill="#FFC017"></path></svg> New</span> : ''
                                        }</p>
                                    </div>
                                </div>
                                <div className="blog_post_content">
                                    <div className="blogpost_content_left">

                                        <Link to={`/blog/${post.id}`} >
                                            <div className="post_title">
                                                <h2>
                                                    {post.title}
                                                </h2>
                                            </div>
                                            <div className="post_description">
                                                <p>
                                                    {post.content}
                                                </p>
                                            </div>
                                        </Link>

                                        <div className="post_after">
                                            <div className="post_info">
                                                <div className="cat">
                                                    <div className="post_category">
                                                        {post.category.map(cat => (
                                                            <span key={cat} className="post_cat">{cat}</span>
                                                        ))}
                                                    </div>
                                                    <div className="read_min">
                                                        <Link to={`/blog/${post.id}`} >
                                                            <span>{getReadTime(post.content)} min read</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="post_share">
                                                    <a
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(window.location.host + "/blog/" + post.id);
                                                            toast.success("URL Copied")
                                                        }}
                                                        data-tip="Copy post url"
                                                        data-for="shareTooltip"
                                                        target="_blank" rel="noopener noreferrer"
                                                    ><svg className="post_details_icon" width="25" height="25" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.57 14.67c0-.57.13-1.11.38-1.6l.02-.02v-.02l.02-.02c0-.02 0-.02.02-.02.12-.26.3-.52.57-.8L7.78 9v-.02l.01-.02c.44-.41.91-.7 1.44-.85a4.87 4.87 0 0 0-1.19 2.36A5.04 5.04 0 0 0 8 11.6L6.04 13.6c-.19.19-.32.4-.38.65a2 2 0 0 0 0 .9c.08.2.2.4.38.57l1.29 1.31c.27.28.62.42 1.03.42.42 0 .78-.14 1.06-.42l1.23-1.25.79-.78 1.15-1.16c.08-.09.19-.22.28-.4.1-.2.15-.42.15-.67 0-.16-.02-.3-.06-.45l-.02-.02v-.02l-.07-.14s0-.03-.04-.06l-.06-.13-.02-.02c0-.02 0-.03-.02-.05a.6.6 0 0 0-.14-.16l-.48-.5c0-.04.02-.1.04-.15l.06-.12 1.17-1.14.09-.09.56.57c.02.04.08.1.16.18l.05.04.03.06.04.05.03.04.04.06.1.14.02.02c0 .02.01.03.03.04l.1.2v.02c.1.16.2.38.3.68a1 1 0 0 1 .04.25 3.2 3.2 0 0 1 .02 1.33 3.49 3.49 0 0 1-.95 1.87l-.66.67-.97.97-1.56 1.57a3.4 3.4 0 0 1-2.47 1.02c-.97 0-1.8-.34-2.49-1.03l-1.3-1.3a3.55 3.55 0 0 1-1-2.51v-.01h-.02v.02zm5.39-3.43c0-.19.02-.4.07-.63.13-.74.44-1.37.95-1.87l.66-.67.97-.98 1.56-1.56c.68-.69 1.5-1.03 2.47-1.03.97 0 1.8.34 2.48 1.02l1.3 1.32a3.48 3.48 0 0 1 1 2.48c0 .58-.11 1.11-.37 1.6l-.02.02v.02l-.02.04c-.14.27-.35.54-.6.8L16.23 15l-.01.02-.01.02c-.44.42-.92.7-1.43.83a4.55 4.55 0 0 0 1.23-3.52L18 10.38c.18-.21.3-.42.35-.65a2.03 2.03 0 0 0-.01-.9 1.96 1.96 0 0 0-.36-.58l-1.3-1.3a1.49 1.49 0 0 0-1.06-.42c-.42 0-.77.14-1.06.4l-1.2 1.27-.8.8-1.16 1.15c-.08.08-.18.21-.29.4a1.66 1.66 0 0 0-.08 1.12l.02.03v.02l.06.14s.01.03.05.06l.06.13.02.02.01.02.01.02c.05.08.1.13.14.16l.47.5c0 .04-.02.09-.04.15l-.06.12-1.15 1.15-.1.08-.56-.56a2.3 2.3 0 0 0-.18-.19c-.02-.01-.02-.03-.02-.04l-.02-.02a.37.37 0 0 1-.1-.12c-.03-.03-.05-.04-.05-.06l-.1-.15-.02-.02-.02-.04-.08-.17v-.02a5.1 5.1 0 0 1-.28-.69 1.03 1.03 0 0 1-.04-.26c-.06-.23-.1-.46-.1-.7v.01z" fill="#f5f2f2"></path></svg>
                                                    </a>
                                                </div>
                                                <ReactTooltip
                                                    place="bottom"
                                                    className="app__toolTip"
                                                    id="shareTooltip"
                                                    backgroundColor="var(--text-color)"
                                                    textColor="var(--black)"
                                                    effect="solid"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post_content_right">
                                        <Link to={`/blog/${post.id}`} >
                                            <div className="post_image">
                                                <img src={post.featuredImage} alt={post.title} width="112" height="112" loading="lazy" />
                                            </div>
                                            <div className="post_image_responsive">
                                                <img src={post.featuredImage} alt={post.title} width="56" height="56" loading="lazy" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}
