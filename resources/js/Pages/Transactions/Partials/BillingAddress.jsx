import Gopay from '@/Pages/Transactions/Partials/Gopay';
import BankTransfer from '@/Pages/Transactions/Partials/BankTransfer';
import { IconCircleCheckFilled } from '@tabler/icons-react';

export default function BillingAddress({ transaction, paid }) {
    return (
        <div className='overflow-hidden'>
            {paid ? (
                <div className='flex items-center gap-x-2 p-4'>
                    <IconCircleCheckFilled className='h-5 w-5 text-emerald-500' />
                    <div>Payment has been received.</div>
                </div>
            ) : (
                <div>
                    <div className='px-6 pt-4'>
                        <h1 className='text-xl font-semibold'>Total: Rp {transaction.gross_amount}</h1>
                    </div>
                    {transaction.payment_method?.method !== 'e-wallet' && <BankTransfer transaction={transaction} />}
                    {transaction.payment_method?.id === 'gopay' && <Gopay transaction={transaction} />}
                </div>
            )}
        </div>
    );
}
