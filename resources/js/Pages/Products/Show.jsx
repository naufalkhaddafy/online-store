import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import clsx from 'clsx';
import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';

export default function Show({ product }) {
    const [selectedAttribute, setSelectedAttribute] = useState(Object.keys(product.variations)[0]);
    const [selectedVariation, setSelectedVariation] = useState(product.variations[selectedAttribute][0]);
    return (
        <>
            <Head title={product.name} />
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                    <div className='aspect-h-1 aspect-w-1 w-full'>
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className='h-full w-full object-cover object-center sm:rounded-lg'
                        />
                    </div>

                    <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>{product.name}</h1>

                        <div className='mt-3'>
                            <h2 className='sr-only'>Product information</h2>
                            <p className='text-3xl tracking-tight text-gray-900'>Rp {product.price}</p>
                        </div>

                        <div className='mt-6'>
                            <h3 className='sr-only'>Description</h3>

                            <div
                                className='text-base leading-relaxed text-gray-700'
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <div className='mt-6'>
                            <div className='space-y-3 rounded-lg bg-white p-4 shadow'>
                                <div>
                                    <RadioGroup
                                        value={selectedAttribute}
                                        onChange={setSelectedAttribute}
                                        className='mt-2'>
                                        <RadioGroup.Label className='sr-only'>Choose variation 1</RadioGroup.Label>
                                        <div className='flex flex-wrap gap-3'>
                                            {Object.keys(product.variations).map((key, index) => (
                                                <RadioGroup.Option
                                                    key={key}
                                                    value={key}
                                                    className={({ active, checked }) =>
                                                        clsx(
                                                            'cursor-pointer focus:outline-none',
                                                            active ? 'ring-blue-500 ring-2 ring-offset-2' : '',
                                                            checked
                                                                ? 'bg-blue-600 hover:bg-blue-700 border-transparent text-white'
                                                                : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
                                                            'inline-flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium uppercase'
                                                        )
                                                    }>
                                                    <RadioGroup.Label as='span'>{key}</RadioGroup.Label>
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <RadioGroup
                                        value={selectedVariation}
                                        onChange={setSelectedVariation}
                                        className='mt-2'>
                                        <RadioGroup.Label className='sr-only'>Choose variation 2</RadioGroup.Label>
                                        <div className='flex flex-wrap gap-3'>
                                            {selectedAttribute
                                                ? product.variations[selectedAttribute].map((variation) => {
                                                      return (
                                                          <RadioGroup.Option
                                                              key={variation.id}
                                                              value={variation}
                                                              className={({ active, checked }) =>
                                                                  clsx(
                                                                      variation.inStock
                                                                          ? 'cursor-pointer focus:outline-none'
                                                                          : 'cursor-not-allowed opacity-25',
                                                                      active
                                                                          ? 'ring-blue-500 ring-2 ring-offset-2'
                                                                          : '',
                                                                      checked
                                                                          ? 'bg-blue-600 hover:bg-blue-700 border-transparent text-white'
                                                                          : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
                                                                      'inline-flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium uppercase'
                                                                  )
                                                              }
                                                              disabled={!variation.inStock}>
                                                              <RadioGroup.Label as='span'>
                                                                  {variation.attribute_2}
                                                              </RadioGroup.Label>
                                                          </RadioGroup.Option>
                                                      );
                                                  })
                                                : null}
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className='sm:flex-col1 mt-10 flex'>
                                <button
                                    type='submit'
                                    className='flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full'>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => (
    <AppLayout
        header={<h2 className='text-xl font-semibold leading-tight text-gray-800'>{page.props.product.name}</h2>}
        children={page}
    />
);
