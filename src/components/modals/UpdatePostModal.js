import React, { useState } from 'react'
import toast from "react-hot-toast";
import { modalClose } from '../../utils';
import { updatePosts, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

export default function UpdatePostModal({ close, data }) {

    const [title, setTitle] = useState(data.title);
    const [featuredImage, setFeaturedImage] = useState(data.featuredImage);
    const [content, setContent] = useState(data.content);
    const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(data.youtubeEmbedUrl);
    const [updatedImage, setUpdatedImage] = useState(null);


    const handleChange = e => {
        if (e.target.files[0]) {
            setUpdatedImage(e.target.files[0]);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!updatedImage)
            return updatePosts(data.id, {
                title,
                featuredImage,
                content,
                youtubeEmbedUrl
            })

        const desertRef = ref(storage, featuredImage);



        const storageRef = ref(storage, `files/${updatedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, updatedImage);



        uploadTask.on("state_changed",
            (snapshot) => {
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                toast.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // Delete the file
                    deleteObject(desertRef).then(() => {
                        toast.success("Previous featured image deleted")
                    }).catch((error) => {
                        toast.error(error.message)
                    });
                    updatePosts(data.id, {
                        title,
                        featuredImage: url,
                        content,
                        youtubeEmbedUrl
                    })
                });
            }
        );

        modalClose()
    }

    return (
        <>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Post Title
                </label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Featured Image [Recommended: 692x400]
                </label>
                <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
                    id="file_input"
                    type="file"
                    accept=".png, .jpg"
                    onChange={handleChange}
                />
                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Post content
                </label>
                <textarea
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={content} onChange={e => setContent(e.target.value)} />
                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    YouTube Embed URL (optional) [e.g: 'rokGy0huYEA']
                </label>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={youtubeEmbedUrl} onChange={e => setYoutubeEmbedUrl(e.target.value)} />
                <br />

                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-black hover:bg-lime-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </>
    )
}
