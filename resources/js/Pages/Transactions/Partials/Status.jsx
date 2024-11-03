import { IconHomeCheck, IconPackages, IconRotateClockwise2, IconTruckDelivery } from '@tabler/icons-react';
import clsx from 'clsx';

export default function Status({ transaction }) {
    return (
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8'>
            <h4 className='sr-only'>Status</h4>
            <div className='mt-6'>
                <div className='overflow-hidden rounded-full bg-slate-200'>
                    <div
                        className='h-2 rounded-full bg-blue-600'
                        style={{ width: `calc((${transaction.step} * 2 + 1) / 8 * 100%)` }}
                    />
                </div>
                <div className='mt-6 hidden grid-cols-4 font-medium text-slate-600 sm:grid'>
                    <div className='flex items-center gap-x-1.5 text-blue-600'>
                        <IconRotateClockwise2 className='stroke-[1.25]' />
                        Pending
                    </div>
                    <div
                        className={clsx(
                            transaction.order_status === 'delivered' ||
                                transaction.order_status === 'processing' ||
                                transaction.order_status === 'shipping'
                                ? 'text-blue-600'
                                : '',
                            'flex items-center justify-center gap-x-1.5'
                        )}>
                        <IconPackages className='stroke-[1.25]' />
                        Processing
                    </div>
                    <div
                        className={clsx(
                            transaction.order_status === 'proccesing' ||
                                transaction.order_status === 'delivered' ||
                                transaction.order_status === 'shipping'
                                ? 'text-blue-600'
                                : '',
                            'flex items-center justify-center gap-x-1.5'
                        )}>
                        <IconTruckDelivery className='stroke-[1.25]' />
                        Shipped
                    </div>
                    <div
                        className={clsx(
                            transaction.order_status === 'delivered' ? 'text-blue-600' : '',
                            'flex items-center justify-end gap-x-1.5'
                        )}>
                        <IconHomeCheck className='stroke-[1.25]' />
                        Delivered
                    </div>
                </div>
            </div>
        </div>
    );
}
