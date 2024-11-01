import { IconShoppingCartOff } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export default function CartEmpty() {
    return (
        <div className='mx-auto w-full max-w-xl sm:pt-32'>
            <div className='mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-white sm:h-24 sm:w-24'>
                <IconShoppingCartOff className='h-8 w-8 stroke-[1.25] sm:h-10 sm:w-10' />
            </div>

            <div className='mt-4 text-center'>
                <h3 className='text-xl font-medium text-gray-900 sm:text-2xl'>Your cart is empty</h3>
                <p className='mb-6 mt-2 text-xl text-gray-500'>
                    Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
                </p>

                <Link
                    className='rounded-lg bg-white px-6 py-3 text-sm font-medium shadow hover:shadow-lg'
                    href={route('products.index')}>
                    Go shopping<span aria-hidden='true'> &rarr;</span>
                </Link>
            </div>
        </div>
    );
}
