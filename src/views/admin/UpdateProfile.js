import React, { useState } from 'react'
import { update, resetPassword, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { setUserData } from '../../utils';
import { Navigate } from "react-router-dom"
import "../../components/UpdateProfile.css"

export default function UpdateProfile() {

    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || '')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(user.photoURL || '')
    const [resume, setResume] = useState('')

    const handleChange = e => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault()

        const storageRef = ref(storage, `profile/profile-photos`);
        const uploadTask = uploadBytesResumable(storageRef, avatar);



        uploadTask.on("state_changed",
            (snapshot) => {
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    update({
                        displayName,
                        photoURL: url
                    })
                    setAvatar(url)
                });
            }
        );

        setUserData()
    }

    const handleResetSubmit = async e => {
        e.preventDefault()
        const result = await resetPassword(password)
        if (result) {
            setPassword('')
        }
    }

    const handleResumeChange = e => {
        if (e.target.files[0]) {
            setResume(e.target.files[0]);
        }
    };

    const handleResumeSubmit = async e => {
        e.preventDefault()

        const storageRef = ref(storage, `resume/resume-file`);
        const uploadTask = uploadBytesResumable(storageRef, resume);



        uploadTask.on("state_changed",
            (snapshot) => {
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setResume(url)
                });
            }
        );
        toast.success("Resume Uploaded");
    }


    if (user) {
        return (
            <>
                <div className="update_profile grid gap-y-10">
                    <h4>Update <span> Profile</span></h4>
                    <form onSubmit={handleSubmit} className="grid gap-7-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Name-Surname
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="John Doe"
                                    value={displayName} onChange={e => setDisplayName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mt-1 block text-sm font-medium text-gray-400">
                                Avatar Image
                            </label>
                            <div className="mt-1">
                                <img src={avatar} alt="profile photos" width="100" height="100" />
                                <input
                                    className="mt-4 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
                                    id="file_input"
                                    type="file"
                                    accept=".png, .jpg"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="inline-flex mt-4 disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                type="submit">
                                Update
                            </button>
                        </div>
                    </form>

                    <h4>Update <span> Password</span></h4>
                    <form onSubmit={handleResetSubmit} className="grid gap-7-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="If you don't want to change it, don't change it!"
                                    value={password} onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                disabled={!password}
                                className="inline-flex mt-4 disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                type="submit">
                                Update Password
                            </button>
                        </div>
                    </form>

                    <h4>Update <span> Resume (CV)</span></h4>
                    <form onSubmit={handleResumeSubmit} className="grid gap-7-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">
                                Resume File
                            </label>
                            <div className="mt-1">
                            <input
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
                                    value={resume}
                                />
                                <input
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
                                    id="file_input"
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleResumeChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="inline-flex mt-4 disabled:opacity-20 cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    return <Navigate to="/" />
}