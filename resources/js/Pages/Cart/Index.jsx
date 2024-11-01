import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import { Head } from '@inertiajs/react';
import CartBlock from './Partials/CardBlock';
import OrderSummary from './Partials/OrderSummary';
import CartEmpty from './Partials/CardEmpty';

export default function Index({ carts }) {
    return (
        <Container>
            <Head title='Shopping Cart' />
            {carts.length > 0 ? (
                <>
                    <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                        <section aria-labelledby='cart-heading' className='lg:col-span-7'>
                            <h2 id='cart-heading' className='sr-only'>
                                Items in your shopping cart
                            </h2>

                            <ul role='list' className='divide-y divide-gray-200 border-b border-t border-gray-200'>
                                {carts.map((cart, idx) => (
                                    <CartBlock key={idx} cart={cart} />
                                ))}
                            </ul>
                        </section>

                        <OrderSummary />
                    </div>
                </>
            ) : (
                <CartEmpty />
            )}
        </Container>
    );
}

Index.layout = (page) => (
    <AppLayout
        header={<h2 className='text-xl font-semibold leading-tight text-gray-800'>Shopping Cart</h2>}
        children={page}
    />
);
