export default function Gopay({ transaction }) {
    return (
        <div className='flex gap-2 p-6'>
            <div className='h-40 w-40 shrink-0 rounded-lg border p-1'>
                <img className='h-full w-full' src={transaction.payment_method?.qrcode} alt='' />
            </div>
            <div className='prose text-sm'>
                <ol>
                    <li>
                        Open your <strong className='text-green-600'>Gojek</strong> app and tap the <strong>Pay</strong>{' '}
                        button on the home screen.
                    </li>
                    <li>Tap the Scan QR button.</li>
                    <li>Scan the QR code above.</li>
                    <li>Enter the amount to pay and tap Pay.</li>
                    <li>
                        Enter your <strong className='text-green-600'>GoPay PIN</strong> to complete the payment.
                    </li>
                </ol>
            </div>
        </div>
    );
}
