import { IconPhoto, IconX } from '@tabler/icons-react';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function UploadImage({ setData, errors }) {
    const [imagePreview, setImagePreview] = useState(null);

    const onFileChange = (e) => {
        setData('picture', e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className='max-w-xl'>
            {imagePreview ? (
                <>
                    <div className='relative'>
                        <button
                            onClick={() => setImagePreview('')}
                            className='absolute right-0 top-0 mr-4 mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900/50 px-2 py-1 text-xs uppercase text-white hover:bg-gray-900/70'>
                            <IconX className='h-6 w-6 stroke-2' />
                        </button>
                        <img
                            className='mb-4 w-full rounded-lg'
                            width='1280'
                            height='720'
                            src={imagePreview}
                            alt='Preview'
                        />
                    </div>
                    {errors?.picture && (
                        <div className='mb-5'>
                            <InputError message={errors.picture} />
                        </div>
                    )}
                </>
            ) : (
                <label htmlFor='picture' className='mb-6 block'>
                    <div className='hover:border-primary-500 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:bg-gray-100'>
                        <div className='flex flex-col items-center justify-center'>
                            <IconPhoto className='inline h-6 w-6 stroke-[1.5] text-gray-400' />
                            <div className='my-2 text-sm text-gray-800'>Upload image</div>
                            <div className='text-2xl text-gray-500'>720 x 720 (1:1)</div>
                        </div>
                    </div>
                    <input type='file' onChange={onFileChange} name='picture' id='picture' className='sr-only' />
                </label>
            )}
        </div>
    );
}
