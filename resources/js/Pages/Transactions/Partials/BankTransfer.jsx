import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Guides from '@/Pages/Transactions/Partials/Guides';

export default function BankTransfer({ transaction }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied]);
    return (
        <div className='relative'>
            <div className='p-5 relative'>
                <div className='ml-3 font-medium -mb-1 text-sm'>{transaction.payment_method.title} Virtual Account</div>
                <div className='mt-2 max-w-xs border px-4 py-2.5 rounded-2xl flex items-center justify-between'>
                    <strong className='font-semibold'>
                        {transaction.payment_method?.va_number || transaction.payment_method?.bill_key}
                    </strong>
                    <CopyToClipboard
                        text={transaction.payment_method?.va_number || transaction.payment_method?.bill_key}
                        onCopy={() => setCopied(true)}>
                        <button className='focus:outline-none [&>svg]:stroke-1'>
                            {copied ? <IconCheck className='text-blue-500' /> : <IconCopy className='text-slate-500' />}
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
            {transaction.payment_method?.biller_code && (
                <div className='mt-8'>
                    Billing number: <strong className='font-semibold'>{transaction.payment_method.biller_code}</strong>
                </div>
            )}
            {transaction.payment_method.id === 'bni' && (
                <Guides bank={transaction.payment_method.id} transaction={transaction} />
            )}
            {transaction.payment_method.id === 'mandiri' && (
                <Guides bank={transaction.payment_method.id} transaction={transaction} />
            )}
        </div>
    );
}
