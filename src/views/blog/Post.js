import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { getDoc, doc } from "firebase/firestore";
import MDEditor from '@uiw/react-md-editor';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import "../../components/SinglePost.css";
import { Helmet } from "react-helmet";
import ReactTooltip from "react-tooltip";



export default function Post() {

    const { url } = useParams();
    const [post, setPost] = useState('');


    useEffect(() => {
        const ref = doc(db, 'posts', url)
        getDoc(ref).then((doc) => {
            if (doc.exists) {
                setPost(doc.data())
            }
            else {
                toast.error("Something went wrong")
            }
        }).catch(error => {
            toast.error(error.message)
        })
    }, [url]);


    const shareTwitter = "https://twitter.com/intent/tweet?text=" + post.title + " " + document.URL + " " + "via: @fatihdelyce";
    const shareFacebook = "https://www.facebook.com/share.php?u=" + document.URL + " ";
    const copyUrl = () => {
        navigator.clipboard.writeText(document.URL);
        toast.success("URL Copied")
    }


    return (
        <>
            <article className="single_post">
                {post && (

                    <>
                        <Helmet>
                            <title>{post.title}</title>
                            <meta name="description" content={post.description} />
                            <meta name="Author" content={post.author}></meta>
                            <meta name="keywords" content={post.category}></meta>
                        </Helmet>

                        <div className="post_details">
                            <div className="post_detail">
                                <div className="author_avatar">
                                    {post.avatar && <img src={post.avatar} alt={post.author} width="48" height="48" />}
                                </div>
                                <div className="author_title">
                                    <div className="author_name">
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="post_info">
                                        <span className="post_detail_content">
                                            {new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                        </span>
                                        <span className="dot"> · </span>
                                        <svg className="post_details_icon" viewBox="0 0 24 24" role="img"><path d="M6.5 10C7.3 10 8 9.3 8 8.5S7.3 7 6.5 7 5 7.7 5 8.5 5.7 10 6.5 10M9 6L16 13L11 18L4 11V6H9M9 4H4C2.9 4 2 4.9 2 6V11C2 11.6 2.2 12.1 2.6 12.4L9.6 19.4C9.9 19.8 10.4 20 11 20S12.1 19.8 12.4 19.4L17.4 14.4C17.8 14 18 13.5 18 13C18 12.4 17.8 11.9 17.4 11.6L10.4 4.6C10.1 4.2 9.6 4 9 4M13.5 5.7L14.5 4.7L21.4 11.6C21.8 12 22 12.5 22 13S21.8 14.1 21.4 14.4L16 19.8L15 18.8L20.7 13L13.5 5.7Z" fill="#b2b2b2"></path></svg>
                                        <span className="post_category">
                                            {post.category.join(", ")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="post_detail">
                                <a
                                    href={shareTwitter}
                                    className="sidebar__menuItem"
                                    data-tip="Share on Twitter"
                                    data-for="shareTooltip"
                                    target="_blank" rel="noopener noreferrer"
                                ><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578a9.3 9.3 0 0 1-2.958 1.13a4.66 4.66 0 0 0-7.938 4.25a13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568a4.692 4.692 0 0 1-2.104.08a4.661 4.661 0 0 0 4.352 3.234a9.348 9.348 0 0 1-5.786 1.995a9.5 9.5 0 0 1-1.112-.065a13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254c0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l.002-.003Z" /></svg>
                                </a>

                                <a
                                    href={shareFacebook}
                                    className="sidebar__menuItem"
                                    data-tip="Share on Facebook"
                                    data-for="shareTooltip"
                                    target="_blank" rel="noopener noreferrer"
                                ><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M32 16c0-8.839-7.167-16-16-16C7.161 0 0 7.161 0 16c0 7.984 5.849 14.604 13.5 15.803V20.626H9.437v-4.625H13.5v-3.527c0-4.009 2.385-6.223 6.041-6.223c1.751 0 3.584.312 3.584.312V10.5h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-.713 4.625H18.5v11.177C26.145 30.603 32 23.983 32 15.999z" /></svg>
                                </a>

                                <a
                                    onClick={copyUrl}
                                    className="sidebar__menuItem"
                                    data-tip="Copy post url"
                                    data-for="shareTooltip"
                                    target="_blank" rel="noopener noreferrer"
                                ><svg className="post_details_icon" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M3.57 14.67c0-.57.13-1.11.38-1.6l.02-.02v-.02l.02-.02c0-.02 0-.02.02-.02.12-.26.3-.52.57-.8L7.78 9v-.02l.01-.02c.44-.41.91-.7 1.44-.85a4.87 4.87 0 0 0-1.19 2.36A5.04 5.04 0 0 0 8 11.6L6.04 13.6c-.19.19-.32.4-.38.65a2 2 0 0 0 0 .9c.08.2.2.4.38.57l1.29 1.31c.27.28.62.42 1.03.42.42 0 .78-.14 1.06-.42l1.23-1.25.79-.78 1.15-1.16c.08-.09.19-.22.28-.4.1-.2.15-.42.15-.67 0-.16-.02-.3-.06-.45l-.02-.02v-.02l-.07-.14s0-.03-.04-.06l-.06-.13-.02-.02c0-.02 0-.03-.02-.05a.6.6 0 0 0-.14-.16l-.48-.5c0-.04.02-.1.04-.15l.06-.12 1.17-1.14.09-.09.56.57c.02.04.08.1.16.18l.05.04.03.06.04.05.03.04.04.06.1.14.02.02c0 .02.01.03.03.04l.1.2v.02c.1.16.2.38.3.68a1 1 0 0 1 .04.25 3.2 3.2 0 0 1 .02 1.33 3.49 3.49 0 0 1-.95 1.87l-.66.67-.97.97-1.56 1.57a3.4 3.4 0 0 1-2.47 1.02c-.97 0-1.8-.34-2.49-1.03l-1.3-1.3a3.55 3.55 0 0 1-1-2.51v-.01h-.02v.02zm5.39-3.43c0-.19.02-.4.07-.63.13-.74.44-1.37.95-1.87l.66-.67.97-.98 1.56-1.56c.68-.69 1.5-1.03 2.47-1.03.97 0 1.8.34 2.48 1.02l1.3 1.32a3.48 3.48 0 0 1 1 2.48c0 .58-.11 1.11-.37 1.6l-.02.02v.02l-.02.04c-.14.27-.35.54-.6.8L16.23 15l-.01.02-.01.02c-.44.42-.92.7-1.43.83a4.55 4.55 0 0 0 1.23-3.52L18 10.38c.18-.21.3-.42.35-.65a2.03 2.03 0 0 0-.01-.9 1.96 1.96 0 0 0-.36-.58l-1.3-1.3a1.49 1.49 0 0 0-1.06-.42c-.42 0-.77.14-1.06.4l-1.2 1.27-.8.8-1.16 1.15c-.08.08-.18.21-.29.4a1.66 1.66 0 0 0-.08 1.12l.02.03v.02l.06.14s.01.03.05.06l.06.13.02.02.01.02.01.02c.05.08.1.13.14.16l.47.5c0 .04-.02.09-.04.15l-.06.12-1.15 1.15-.1.08-.56-.56a2.3 2.3 0 0 0-.18-.19c-.02-.01-.02-.03-.02-.04l-.02-.02a.37.37 0 0 1-.1-.12c-.03-.03-.05-.04-.05-.06l-.1-.15-.02-.02-.02-.04-.08-.17v-.02a5.1 5.1 0 0 1-.28-.69 1.03 1.03 0 0 1-.04-.26c-.06-.23-.1-.46-.1-.7v.01z"></path></svg>
                                </a>
                            </div>

                            <ReactTooltip
                                place="top"
                                className="app__toolTip"
                                id="shareTooltip"
                                backgroundColor="var(--text-color)"
                                textColor="var(--black)"
                                effect="solid"
                            />
                        </div>

                        <h1 className="single_post_title">
                            {post.title}
                        </h1>

                        <figure className="post_figure_image">
                            <div>
                                <img src={post.featuredImage} alt={post.title} width="692" height="400" sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px" loading="eager" role="presentation" />
                            </div>
                        </figure>

                        {post.youtubeEmbedUrl !== '' ? <YoutubeEmbed embedId={post.youtubeEmbedUrl} /> : ''}

                        <div className="post_content">
                            <MDEditor.Markdown source={post.content} style={{ whiteSpace: 'pre-wrap', background: 'none' }} />
                        </div>

                    </>
                )}

            </article>
        </>
    )
}
