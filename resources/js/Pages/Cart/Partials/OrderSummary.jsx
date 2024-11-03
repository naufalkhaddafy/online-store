import { Link, usePage } from '@inertiajs/react';

export default function OrderSummary() {
    const { orderSummary } = usePage().props;
    return (
        <section
            aria-labelledby='summary-heading'
            className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 id='summary-heading' className='text-lg font-medium text-gray-900'>
                Order summary
            </h2>

            <dl className='mt-6 space-y-4'>
                <div className='flex items-center justify-between'>
                    <dt className='text-sm text-gray-600'>Subtotal</dt>
                    <dd className='font-mono text-sm font-medium text-gray-900'>{orderSummary.subtotal}</dd>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <dt className='flex text-sm text-gray-600'>
                        <span>PPN</span>
                        <a href='#' className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500'>
                            <span className='sr-only'>Learn more about how tax is calculated</span>
                        </a>
                    </dt>
                    <dd className='font-mono text-sm font-medium text-gray-900'>{orderSummary.tax}</dd>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <dt className='text-base font-medium text-gray-900'>Order total</dt>
                    <dd className='font-mono text-base font-medium text-gray-900'>Rp {orderSummary.total}</dd>
                </div>
            </dl>

            <div className='mt-6'>
                <Link
                    method='post'
                    as='button'
                    href={route('checkout.create')}
                    className='block w-full rounded-md border border-transparent bg-blue-600 px-4 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50'>
                    Checkout
                </Link>
            </div>
        </section>
    );
}
