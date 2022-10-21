import React from 'react'
import { Dialog } from '@headlessui/react';
import { deletePosts, storage } from '../../firebase';
import { ref, deleteObject } from "firebase/storage";
import { modalClose } from '../../utils';
import toast from 'react-hot-toast';

export default function DeletePostModal({ close, data }) {

  const handleDelete = async id => {
    await deletePosts(id)
    const desertRef = ref(storage, data.featuredImage);

    // Delete the file
    deleteObject(desertRef).then(() => {
       toast.success("Featured image deleted successfully")
    }).catch((error) => {
       toast.error(error.message)
    });
    modalClose()
  }

  return (
    <div style={{ 'color': 'black' }}>

      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-100"
      >
        Are you sure you want to delete the post?
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          This action cannot be undone.
        </p>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-dark hover:bg-lime-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => handleDelete(data.id)}
        >
          Yes, delete post.
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 ml-2 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => modalClose()}
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  )
}
