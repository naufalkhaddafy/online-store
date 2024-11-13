import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Container from '@/Components/Container';
import InputLabel from '@/Components/InputLabel';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import { IconSquareRoundedPlusFilled, IconTrash } from '@tabler/icons-react';
import { NumericFormat } from 'react-number-format';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import UploadImage from '@/Components/UploadImage';
import Select from '@/Components/Select';

export default function Form({ categories, product, page_settings }) {
    const { data, setData, errors, post, processing, reset } = useForm({
        category_id: product.category_id || 0,
        picture: product.imageSrc || '',
        name: product.name || 0,
        weight: product.weight || 0,
        slug: product.slug || 0,
        description: product.description || 0,
        price: product.price || 0,
        _method: page_settings.method,
    });
    console.log(product);
    // console.log(setData);

    const [inputFields, setInputFields] = useState(
        product.variations && product.variations?.length > 0
            ? product.variations
            : [{ attribute_1: '', attribute_2: '', price: '', stock: '', weight: data.weight }]
    );

    function submit(e) {
        e.preventDefault();
        router.post(
            page_settings.url,
            {
                ...data,
                variations: inputFields,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setInputFields([{ attribute_1: '', attribute_2: '', price: '', stock: '', weight: 0 }]);
                },
            }
        );
    }

    function handleInputChange(index, event) {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    function onChange(event) {
        setData(event.target.name, event.target.value);
    }

    function handleAddFields() {
        let newfield = { attribute_1: '', attribute_2: '', price: 0, weight: 0, stock: 0 };
        setInputFields([...inputFields, newfield]);
    }

    function handleRemoveFields(index) {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    return (
        <div>
            <Head title={'Create Product'} />
            <Container>
                <div className='mt-16 rounded-xl bg-white p-4 shadow'>
                    <form onSubmit={submit}>
                        <UploadImage errors={errors} setData={data} />
                        <div className='mb-6 max-w-xl'>
                            <InputLabel htmlFor='name' value='Name' />
                            <TextInput className='w-full' onChange={onChange} name='name' value={data.name} />
                            <InputError message={errors.name} />
                        </div>
                        <div className='mb-6 max-w-xl'>
                            <InputLabel htmlFor='weight' value='Weight' />
                            <TextInput
                                type='number'
                                placeholder={200}
                                className='w-full'
                                onChange={onChange}
                                name='weight'
                                value={data.weight}
                            />
                            <InputError message={errors.weight} />
                        </div>
                        <div className='mb-6 max-w-xs'>
                            <InputLabel htmlFor='price' value='Price' />
                            <NumericFormat
                                className='w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                name='price'
                                prefix='Rp '
                                thousandSeparator={true}
                                aria-describedby='price-currency'
                                allowNegative={false}
                                decimalScale={2}
                                value={data.price}
                                onValueChange={(values, sourceInfo) => {
                                    setData('price', values.floatValue);
                                }}
                            />
                            <InputError message={errors.price} />
                        </div>
                        <div className='mb-6 max-w-xl'>
                            <InputLabel htmlFor='category_id' value='Category' />
                            <Select
                                name='category_id'
                                id='category_id'
                                options={categories}
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                                value={data.category_id}
                                onChange={onChange}
                            />
                            <InputError message={errors.category_id} />
                        </div>
                        <div className='mb-6 max-w-xl'>
                            <InputLabel htmlFor='description' value='Description' />
                            <textarea
                                rows={4}
                                name='description'
                                id='description'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                                value={data.description}
                                onChange={onChange}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className='mb-6'>
                            <div>
                                <div className='mb-2 flex items-center gap-x-2'>
                                    <InputLabel htmlFor='variation' value='Variations' />

                                    <button className='text-blue-500' type='button' onClick={() => handleAddFields()}>
                                        <IconSquareRoundedPlusFilled />
                                    </button>
                                </div>
                                {inputFields.map((inputField, index) => (
                                    <div key={index} className='mb-2 grid grid-cols-12 gap-2'>
                                        <TextInput
                                            className='col-span-2 h-9 w-full'
                                            type='text'
                                            name='attribute_1'
                                            placeholder='Attribute 1'
                                            value={inputField.attribute_1}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <TextInput
                                            className='col-span-2 h-9 w-full'
                                            type='text'
                                            name='attribute_2'
                                            placeholder='Attribute 2'
                                            value={inputField.attribute_2}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <TextInput
                                            className='col-span-2 h-9 w-full'
                                            type='number'
                                            name='price'
                                            placeholder='Price'
                                            value={inputField.price}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <TextInput
                                            className='col-span-2 h-9 w-full'
                                            type='number'
                                            name='stock'
                                            placeholder='Stock'
                                            value={inputField.stock}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <TextInput
                                            className='col-span-2 h-9 w-full'
                                            type='number'
                                            name='weight'
                                            placeholder='Satuan Gram'
                                            value={inputField.weight}
                                            onChange={(event) => handleInputChange(index, event)}
                                        />
                                        <div className='col-span-1'>
                                            <button
                                                type='button'
                                                className='flex h-9 w-9 rounded bg-gray-900 text-sm font-medium text-white'
                                                onClick={() => handleRemoveFields(index)}>
                                                <IconTrash className='m-auto h-4 w-4 stroke-1' />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                    </form>
                </div>
            </Container>
        </div>
    );
}

Form.layout = (page) => (
    <AppLayout
        header={
            <h2 className='text-xl font-semibold leading-tight text-slate-800'>{page.props.page_settings.title}</h2>
        }
        children={page}
    />
);
