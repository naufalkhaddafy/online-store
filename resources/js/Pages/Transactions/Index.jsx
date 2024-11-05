import AppLayout from '@/Layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Container from '@/Components/Container';
import Select from '@/Components/Select';
import { useState } from 'react';
import Details from '@/Pages/Transactions/Partials/Details';
import { IconHomeCheck } from '@tabler/icons-react';
import TransactionBlock from '@/Pages/Transactions/Partials/TransactionBlock';

export default function Index() {
    const { data: transactions, meta, links } = usePage().props.transactions;
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null);

    return (
        <>
            <Head title='Customer Orders' />
            <Container>
                {details !== null && <Details open={open} setOpen={setOpen} details={details} />}
                <div className='py-8 lg:py-16'>
                    <div className='grid grid-cols-4 gap-4'>
                        {transactions.map((transaction, key) => (
                            <TransactionBlock
                                key={key}
                                {...{
                                    transaction,
                                    setOpen,
                                    setDetails,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}

Index.layout = (page) => (
    <AppLayout
        header={<h1 className='text-3xl font-bold tracking-tight text-slate-900'>Customer Orders</h1>}
        children={page}
    />
);
