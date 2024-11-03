export default function Shipping({ transaction }) {
    return (
        <>
            <div className='mt-6 lg:col-span-7 lg:mt-0'>
                <dl className='grid grid-cols-2 gap-x-6 text-sm'>
                    <div>
                        <dt className='font-medium text-gray-900'>Alamat Pengiriman</dt>
                        <dd className='mt-3 text-gray-500'>
                            <span className='block'>{transaction.shipping_information.address.detail}</span>
                        </dd>
                    </div>
                    <div>
                        <dt className='font-medium text-gray-900'>Kurir</dt>
                        <dd className='mt-3 space-y-0 text-slate-500'>
                            <div>
                                {transaction.shipping_information.courier.name}{' '}
                                <strong className='font-semibold uppercase'>
                                    ({transaction.shipping_information.courier.code})
                                </strong>
                            </div>
                            <div>
                                {transaction.shipping_information.service.name}{' '}
                                <strong className='font-semibold uppercase'>
                                    ({transaction.shipping_information.service.id})
                                </strong>
                                <div className='mt-2'>
                                    Estimated time of arrival is {transaction.shipping_information.service.etd} days
                                </div>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
}
