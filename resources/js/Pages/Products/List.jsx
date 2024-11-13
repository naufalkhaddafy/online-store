import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Container from '@/Components/Container';
import Pagination from '@/Components/Pagination';

export default function List() {
    const { data: products, meta, links } = usePage().props.products;

    function kick(product) {
        if (confirm('Are you sure you want to delete this product?') === true) {
            router.delete(route('products.destroy', [product]));
        }
    }

    return (
        <>
            <Head title='Products' />
            <Container>
                <div className='grid grid-cols-4 gap-6 py-12'>
                    {products.map((product) => (
                        <div className='flex h-48 flex-col divide-y rounded-lg bg-white shadow' key={product.id}>
                            <div className='flex-1 p-4'>
                                <div className='flex gap-4'>
                                    <div className='mb-5 aspect-[1/1] w-16 overflow-hidden rounded-lg'>
                                        <img
                                            className='h-full w-full object-cover object-center'
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                        />
                                    </div>
                                    <div>
                                        <Link href={product.href}>
                                            <h4 className='text-sm font-semibold hover:underline'>{product.name}</h4>
                                        </Link>

                                        <p className='mt-4 text-sm text-gray-500'>Rp {product.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between px-4 py-2'>
                                <div className='flex items-center gap-x-1'>
                                    <Link
                                        className='rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200'
                                        href={route('products.edit', [product])}>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => kick(product)}
                                        className='rounded-lg bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-900 hover:bg-red-200'>
                                        Delete
                                    </button>
                                </div>

                                {product.category ? (
                                    <Link
                                        className='rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200'
                                        href={product.category.href}>
                                        {product.category.name}
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
                {meta.has_pages && <Pagination links={links} />}
            </Container>
        </>
    );
}

List.layout = (page) => (
    <AppLayout
        header={
            <div className='flex justify-between'>
                <h2 className='text-xl font-semibold leading-tight text-slate-800'>Products</h2>
                <div>
                    <Link className='text-blue-600 underline' href={route('products.create')}>
                        Create Product
                    </Link>
                </div>
            </div>
        }
        children={page}
    />
);
