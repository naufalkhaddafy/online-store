import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import Shipping from '@/Pages/Transactions/Partials/Shipping';
import BillingAddress from '@/Pages/Transactions/Partials/BillingAddress';
import { useState } from 'react';
import Container from '@/Components/Container';
import ProductDetail from '@/Pages/Transactions/Partials/ProductDetail';
import Status from '@/Pages/Transactions/Partials/Status';

export default function Show({ transaction }) {
    const [paid, setPaid] = useState(transaction.transaction_status === 'settlement');
    Echo.private(`transactions.${transaction.customer_id}`).listen('InvoicePaid', (event) => {
        if (
            event.transaction.transaction_status === 'settlement' &&
            transaction.order_id === event.transaction.order_id
        ) {
            setPaid(true);
        }
    });

    return (
        <>
            <Head title={transaction.order_id} />
            <Container>
                <div className='py-8 lg:py-16'>
                    <div className='border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border'>
                        <BillingAddress transaction={transaction} paid={paid} />
                        <div className='border-t px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8'>
                            <ProductDetail transaction={transaction} />

                            <Shipping transaction={transaction} />
                        </div>

                        <Status transaction={transaction} />
                    </div>
                </div>
            </Container>
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
                        <a
                            href={route('invoice.download', [page.props.transaction])}
                            className='font-medium text-blue-600 hover:text-blue-500'>
                            Download invoice
                            <span aria-hidden='true'> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        }
        children={page}
    />
);
