import React, { useState } from 'react'
import "../../components/CreateBlog.css";
import MDEditor from '@uiw/react-md-editor';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { addPosts, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function CreateBlog() {

    const { user } = useSelector(state => state.auth);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
    const [featuredImage, setFeaturedImage] = useState(null);

    const handleChange = e => {
        if (e.target.files[0]) {
            setFeaturedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !category || !content || !featuredImage) {
            return toast.error("Please fill in all fields!");
        }

        if (content.length < 100) {
            return toast.error("Content should be of atleast 100");
        }
        if (title.trim().split(" ").length < 2) {
            return toast.error("Title should be of atleast 2 words");
        }

        const storageRef = ref(storage, `files/${featuredImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, featuredImage);



        uploadTask.on("state_changed",
            (snapshot) => {
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                toast.error(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addPosts({
                        title: title,
                        author: user.displayName,
                        avatar: user.photoURL,
                        category: category.split(","),
                        createdAt: new Date(),
                        featuredImage: url || null,
                        content: content,
                        uid: user.uid,
                        youtubeEmbedUrl: youtubeEmbedUrl,
                    });
                });
            }
        );


        toast.success("Post add succesfuly");
    }




    if (user) {
        return (
            <>
                <div className="create_blog">
                    <h4>Add <span> New Post</span></h4>
                    <div className="add_post">
                        <form onSubmit={handleSubmit}>
                            <div className="form_group">
                                <label
                                    htmlFor="first_name"
                                    className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Post Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form_group">
                                <label
                                    htmlFor="first_name"
                                    className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Post Category
                                </label>
                                <input
                                    type="text"
                                    name="categories"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Categories [Followed with commans for multiple]"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="form_group">
                                <label
                                    htmlFor="first_name"
                                    className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    YouTube Embed URL
                                </label>
                                <input
                                    type="text"
                                    name="youtubeEmbedUrl"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="YouTube Embed URL (optional) [e.g: 'rokGy0huYEA']"
                                    value={youtubeEmbedUrl}
                                    onChange={(e) => setYoutubeEmbedUrl(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <label
                                className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input"
                            >
                                Upload Image [Recommended: 692x400]
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
                                id="file_input"
                                type="file"
                                accept=".png, .jpg"
                                onChange={handleChange}
                            />

                            <div className="form_group">

                                <label
                                    className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    htmlFor="file_input"
                                >
                                    Post Content
                                </label>
                                <MDEditor
                                    value={content}
                                    onChange={setContent}
                                />
                            </div>
                            <div className="form_group">
                                <input type="submit" className="mt-4 w-full focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" value="Add Post" />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
