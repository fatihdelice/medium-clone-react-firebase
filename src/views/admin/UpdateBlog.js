import React from 'react'
import { modal } from '../../utils';
import { useSelector } from 'react-redux';
import "../../components/UpdateBlog.css";

export default function UpdateBlog() {

    const { posts } = useSelector(state => state.posts);
    return (
        <>

            <div className="update_blog">
                <h4>All <span>Posts</span></h4>

                <div className="text-gray-900">
                    <div className="mt-6 overflow-x-auto w-full">
                        <table className="w-full text-md bg-white shadow-md rounded mb-4">
                            <tbody>
                                <tr className="border-b">
                                    <th className="text-left p-3 px-5">Title</th>
                                    <th className="text-left p-3 px-5">Category</th>
                                    <th className="text-left p-3 px-5">Author</th>
                                    <th className="text-left p-3 px-5">Date</th>
                                    <th></th>
                                </tr>
                                {posts.map(post => (
                                    <tr key={post.id} className="border-b hover:bg-orange-100 bg-gray-100">
                                        <td className="p-3 px-5">{post.title}</td>
                                        {post.category.map(cat => (
                                            <td key={cat} className="p-3 px-5">{cat}</td>
                                        ))}
                                        <td className="p-3 px-5">{post.author}</td>
                                        <td className="p-3 px-5">{new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                        <td className="p-3 px-5 flex justify-end">
                                            <button
                                                onClick={() => modal('update-post-modal', post)}
                                                type="button"
                                                className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => modal('delete-post-modal', post)}
                                                type="button"
                                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
