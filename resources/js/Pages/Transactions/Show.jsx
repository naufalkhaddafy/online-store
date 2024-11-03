import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ transaction }) {
    const [paid, setPaid] = useState(false);

    return (
        <>
            <Head title={transaction.order_id} />
            {/*  transaction detail goes here  */}
        </>
    );
}

Show.layout = (page) => (
    <AppLayout
        header={
            <div>
                <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Order Details</h1>

                <div className='mt-2 pb-5 text-sm sm:flex sm:justify-between'>
                    <dl className='flex'>
                        <dt className='text-slate-500'>Order number&nbsp;</dt>
                        <dd className='font-medium text-slate-900'>{page.props.transaction.order_id}</dd>
                        <dt>
                            <span className='sr-only'>Date</span>
                            <span className='mx-2 text-slate-400' aria-hidden='true'>
                                &middot;
                            </span>
                        </dt>
                        <dd className='font-medium text-slate-900'>
                            <time dateTime='2021-03-22'>{page.props.transaction.transaction_time}</time>
                        </dd>
                    </dl>
                    <div className='mt-4 sm:mt-0'>
                        <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                            View invoice
                            <span aria-hidden='true'> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        }
        children={page}
    />
);
