import React, { Fragment, useState } from 'react'
import modals from '../modals';
import { Dialog, Transition } from '@headlessui/react';
import { modalClose } from '../utils';


export default function Modal({ name, data }) {

    const currentModal = modals.find(m => m.name === name)
    const [isOpen, setIsOpen] = useState(true)


    const closeModal = () => {
        setIsOpen(false)
        setTimeout(modalClose, 100)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-left">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="mb-12 p-4 w-full max-w-xl text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400">
                                    <currentModal.element close={closeModal} data={data} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
