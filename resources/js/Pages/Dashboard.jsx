import AppLayout from '@/Layouts/AppLayout';
import { Head, usePage } from '@inertiajs/react';
import Container from '@/Components/Container';
import { IconHomeCheck, IconPackages, IconRotateClockwise2, IconTruckDelivery } from '@tabler/icons-react';
import clsx from 'clsx';
import Pagination from '@/Components/Pagination';

export default function Dashboard() {
    const { data: transactions, meta, links } = usePage().props.transactions;
    return (
        <>
            <Head title='Dashboard' />

            <div className='py-12'>
                <Container>
                    {transactions.length > 0 ? (
                        <>
                            <div className='grid grid-cols-3 gap-6'>
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className='space-y-2 rounded-lg bg-white p-4 shadow'>
                                        <div className='flex items-center justify-between'>
                                            <span className='inline-flex items-center gap-x-1 rounded border px-1 py-0.5 text-sm font-medium [&>svg]:h-4  [&>svg]:w-4  [&>svg]:stroke-[1.25]'>
                                                {transaction.order_status === 'pending' && <IconRotateClockwise2 />}
                                                {transaction.order_status === 'processing' && <IconPackages />}
                                                {transaction.order_status === 'shipping' && <IconTruckDelivery />}
                                                {transaction.order_status === 'delivered' && <IconHomeCheck />}
                                                {transaction.order_status === 'pending'
                                                    ? 'wait for confirmed'
                                                    : transaction.order_status}
                                            </span>
                                            <span
                                                className={clsx(
                                                    'text-sm font-semibold',
                                                    transaction.transaction_status === 'settlement' && 'text-green-500',
                                                    transaction.transaction_status === 'pending' && 'text-yellow-500',
                                                    transaction.transaction_status === 'cancel' && 'text-red-500',
                                                    transaction.transaction_status === 'expiry' && 'text-red-500'
                                                )}>
                                                {transaction.transaction_status}
                                            </span>
                                        </div>
                                        <h4 className='text-lg font-semibold'>Order #{transaction.order_id}</h4>
                                        <div className='uppercase'>
                                            {transaction.shipping.courier.id} - {transaction.shipping.service.id} (Etd{' '}
                                            {transaction.shipping.service.etd} hari)
                                        </div>
                                        <div>
                                            Total{' '}
                                            <strong className='font-semibold'>Rp {transaction.gross_amount}</strong>
                                        </div>

                                        <div className='flex items-center gap-x-1'>
                                            <a
                                                href={route('transactions.show', [transaction])}
                                                className='rounded-lg border bg-slate-50 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-slate-100'>
                                                Lihat Detail
                                            </a>
                                            <a
                                                href={route('invoice.download', [transaction])}
                                                className='rounded-lg border bg-slate-50 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-slate-100'>
                                                Download invoice
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {meta.has_pages && <Pagination meta={meta} links={links} />}
                        </>
                    ) : (
                        <div className='rounded-lg bg-white p-4 shadow'>Anda tidak memiliki transaksi</div>
                    )}
                </Container>
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <AppLayout
        header={<h2 className='text-xl font-semibold leading-tight text-slate-800'>Dashboard</h2>}
        children={page}
    />
);
