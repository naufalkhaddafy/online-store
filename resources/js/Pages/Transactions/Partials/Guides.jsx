export default function Guides({ bank }) {
    return (
        <div className='mt-4 border-t'>
            {bank === 'bni' && (
                <div className='prose p-4'>
                    <h3>
                        <strong>How to pay using BNI Virtual Account</strong>
                    </h3>
                    <ol class='list-decimal pl-6'>
                        <li>
                            Go to the nearest BNI ATM or BNI Syariah ATM and select the{' '}
                            <strong>Other Transactions</strong> menu.
                        </li>
                        <li>
                            Select <strong>Transfer</strong>.
                        </li>
                        <li>
                            Select <strong>Other Bank Account</strong>.
                        </li>
                        <li>
                            Enter the <strong>Virtual Account Number</strong> that you have received.
                        </li>
                        <li>
                            Enter the <strong>amount</strong> that you have to pay.
                        </li>
                        <li>Follow the next instructions until the transaction is complete.</li>
                    </ol>
                </div>
            )}

            {bank === 'mandiri' && (
                <div className='prose p-4'>
                    <h3>How to pay using Mandiri Virtual Account</h3>
                    <ol class='list-decimal pl-6'>
                        <li>
                            Go to the nearest Mandiri ATM and select the <strong>Other Transactions</strong> menu.
                        </li>
                        <li>
                            Select <strong>Transfer</strong>.
                        </li>
                        <li>
                            Select <strong>Other Bank Account</strong>.
                        </li>
                        <li>
                            Enter the <strong>Virtual Account Number</strong> that you have received.
                        </li>
                        <li>
                            Enter the <strong>amount</strong> that you have to pay.
                        </li>
                        <li>Follow the next instructions until the transaction is complete.</li>
                    </ol>
                </div>
            )}
        </div>
    );
}
