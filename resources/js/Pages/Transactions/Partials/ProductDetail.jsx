export default function ProductDetail({ transaction }) {
    return (
        <div className='space-y-4 lg:col-span-5'>
            {transaction.details.map((detail, key) => (
                <div className='flex' key={key}>
                    <div className='aspect-h-1 aspect-w-1 sm:aspect-none w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24'>
                        <img
                            src={detail.image}
                            alt={detail.name}
                            className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                        />
                    </div>

                    <div className='mt-6 flex flex-col sm:ml-6 sm:mt-0'>
                        <div className='flex-1'>
                            <h3 className='text-base font-medium text-gray-900'>{detail.name}</h3>
                            <p className='mt-1 flex gap-x-2 text-sm text-gray-500'>
                                <span>{detail.variation.attribute_1}</span>
                                <span>/</span>
                                <span>{detail.variation.attribute_2}</span>
                            </p>
                        </div>
                        <p className='mt-3 text-sm font-medium text-gray-900'>Rp {detail.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
