import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Details({ open, setOpen, details }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                                <div className='flex flex-col gap-2'>
                                    {details.map((detail, index) => (
                                        <div key={index} className='flex items-center gap-x-2'>
                                            <img className='h-12 w-12 rounded-lg' src={detail.image} alt='' />
                                            <div>
                                                <strong className='block'>{detail.name}</strong>
                                                <div className='text-sm text-gray-500'>Rp {detail.price}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
