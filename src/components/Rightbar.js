import React from 'react'
import "./Rightbar.css";
import ReactTooltip from "react-tooltip";

export default function Rightbar() {
    const avatar ="avatar-image-url";
    const resume = "resume-pdf-url";

    return (
        <>
            <div className="rightbar">
                <div className="rightbar_contain">
                    <div className="rightbar_author">
                        <div className="me">
                            <img src={avatar} alt="Fatih Delice" width="88" height="88" />
                        </div>
                        <h2>Fatih Delice</h2>
                        <p>Computer engineer, developer, creator</p>
                        <div className="author_social">

                            <a
                                href={resume} 
                                className="author_social_subscribe"
                                target="_blank"
                                rel="noreferrer"
                                data-tip="Check out my resume"
                                data-for="rightbarTooltip"
                                download={resume}
                            >
                                Resume
                            </a>

                            <a
                                href="mailto:username@email.com"
                                className="author_social_button"
                                target="_blank"
                                rel="noreferrer"
                                data-tip="Contact me"
                                data-for="rightbarTooltip"
                            >
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="tm qz ra"><rect x="26.25" y="9.25" width="0.5" height="6.5" rx="0.25"></rect><rect x="29.75" y="12.25" width="0.5" height="6.5" rx="0.25" transform="rotate(90 29.75 12.25)"></rect><path d="M19.5 12.5h-7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5"></path><path d="M11.5 14.5L19 20l4-3"></path></svg>
                            </a>

                        </div>
                    </div>
                    <div className="rightbar_footer">
                        <div className="copyright">
                            2022 © Copyright Fatih Delice
                        </div>
                    </div>
                </div>

                <ReactTooltip
                    place="bottom"
                    className="app__toolTip"
                    id="rightbarTooltip"
                    backgroundColor="var(--text-color)"
                    textColor="var(--black)"
                    effect="solid"
                />
            </div>
        </>
    )
}
