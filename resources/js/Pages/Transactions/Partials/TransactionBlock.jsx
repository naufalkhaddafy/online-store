import { IconHomeCheck } from '@tabler/icons-react';
import { router } from '@inertiajs/react';

export default function TransactionBlock({ transaction, setOpen, setDetails }) {
    function setStatus(status, transaction) {
        router.put(
            route('transactions.update', [transaction]),
            {
                order_status: status,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }
    return (
        <div className='overflow-hidden flex flex-col h-[35rem] rounded-lg bg-white p-4 text-sm shadow'>
            <div className='flex-1'>
                <div className='mb-5 flex justify-between'>
                    <div>
                        <span className='text-gray-500'>Username:</span>
                        <div>{transaction.customer.name}</div>
                    </div>
                    {transaction.order_status === 4 && <IconHomeCheck className='text-emerald-500 stroke-[1.25]' />}
                </div>
                <div className='mb-5'>
                    <span>Address:</span>

                    <div className='text-xs text-gray-500'>
                        <div>
                            {transaction.shipping_information?.address.province} /{' '}
                            {transaction.shipping_information?.address.city} /{' '}
                            {transaction.shipping_information?.address.subdistrict}
                        </div>
                        <div>{transaction.shipping_information?.address.detail}</div>
                    </div>
                </div>
                <div className='mb-5'>
                    <span>Order ID:</span>
                    <div className='text-xs text-gray-500'>{transaction.order_id}</div>
                </div>
                <div className='mb-5'>
                    <span>Total:</span>
                    <div className='text-xs text-gray-500'>Rp {transaction.gross_amount}</div>
                </div>
                <div className='mb-5'>
                    <span>Waktu Transaksi:</span>
                    <div className='text-xs text-gray-500'>{transaction.transaction_time}</div>
                </div>
                <div className='mb-5'>
                    <span>Status Pembayaran:</span>
                    <div className='text-xs text-gray-500'>{transaction.transaction_status}</div>
                </div>
                <div className='mb-5'>
                    <span className='block mb-1'>Status Pengiriman:</span>
                    <select
                        className='py-1 shadow-sm focus:outline-none text-sm border-gray-300 rounded'
                        onChange={(e) => setStatus(e.target.value, transaction)}
                        value={transaction.order_status}>
                        {[
                            { id: 1, name: 'Pending' },
                            { id: 2, name: 'Processing' },
                            { id: 3, name: 'Shipping' },
                            { id: 4, name: 'Delivered' },
                        ].map((status, key) => (
                            <option key={key} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <button
                    className='px-2 py-1 border bg-gray-50 text-sm font-medium rounded'
                    onClick={() => {
                        setDetails(transaction.details);
                        setOpen(true);
                    }}>
                    Show detail
                </button>
            </div>
        </div>
    );
}
