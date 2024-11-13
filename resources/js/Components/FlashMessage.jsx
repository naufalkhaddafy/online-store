import { IconAlertCircle, IconCircleCheck, IconExclamationCircle, IconX } from '@tabler/icons-react';
import React, { Fragment, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function FlashMessage() {
    const [visible, setVisible] = useState(false);
    const [timeExit, setTimeExit] = useState(null);
    const { flash_message } = usePage().props;
    useEffect(() => {
        setVisible(true);
        if (timeExit) {
            clearTimeout(timeExit);
        }
        setTimeExit(setTimeout(() => setVisible(false), 4000));
    }, [flash_message]);
    return (
        <div
            aria-live='assertive'
            className='pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6'>
            <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                    show={!!flash_message?.type && visible}
                    as={Fragment}
                    enter='transform ease-out duration-300 transition'
                    enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
                    enterTo='translate-y-0 opacity-100 sm:translate-x-0'
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-300'>
                        <div className='p-4'>
                            <div className='flex items-start'>
                                <div className='flex-shrink-0'>
                                    {flash_message.type === 'success' && (
                                        <IconCircleCheck className='stroke-[1.25] text-emerald-500 lg:mt-0.5' />
                                    )}
                                    {flash_message.type === 'error' && (
                                        <IconAlertCircle className='stroke-[1.25] text-rose-500 lg:mt-0.5' />
                                    )}
                                    {flash_message.type === 'info' && (
                                        <IconExclamationCircle className='stroke-[1.25] text-sky-500 lg:mt-0.5' />
                                    )}
                                    {flash_message.type === 'warning' && (
                                        <IconAlertCircle className='stroke-[1.25] text-orange-500 lg:mt-0.5' />
                                    )}
                                </div>
                                <div className='ml-3 w-0 flex-1 pt-0.5'>
                                    <p className='text-sm font-medium text-black'>{flash_message.title}</p>
                                    <p className='mt-1 text-sm text-gray-500'>{flash_message.message}</p>
                                </div>
                                <div className='ml-4 flex flex-shrink-0'>
                                    <button
                                        type='button'
                                        className='inline-flex rounded-md bg-white p-1 text-gray-500 ring-1 ring-gray-300 hover:bg-gray-100 hover:text-black focus:outline-none'
                                        onClick={() => {
                                            setVisible(false);
                                        }}>
                                        <span className='sr-only'>Close</span>
                                        <IconX className='h-4 w-4' aria-hidden='true' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}
