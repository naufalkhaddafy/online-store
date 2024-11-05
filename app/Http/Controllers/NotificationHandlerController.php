<?php

namespace App\Http\Controllers;

use App\Contracts\Midtrans\TransactionInterface;
use App\Events\InvoicePaid;
use App\Models\Transaction;
use Illuminate\Http\Request;

class NotificationHandlerController extends Controller
{
    public function handling(Request $request, TransactionInterface $transactionService)
    {
        $transaction = Transaction::query()
            ->select('id', 'customer_id', 'order_id', 'gross_amount', 'transaction_status')
            ->where('order_id', $request->order_id)
            ->first();

        abort_if(! $transaction, 404);

        $signature = $transactionService->hasValidSignature($request, $transaction->gross_amount);
        if ($signature) {
            $transaction->update([
                'merchant_id' => $request->merchant_id,
                'status_message' => $request->status_message,
                'transaction_id' => $request->transaction_id,
                'transaction_status' => $request->transaction_status,
                'transaction_time' => $request->transaction_time,
                'settlement_time' => $request->settlement_time,
                'expiry_time' => $request->expiry_time,
                'fraud_status' => $request->fraud_status,
            ]);

            if ($request->transaction_status === 'settlement') {
                broadcast(new InvoicePaid($transaction))->toOthers();
            }
        }
    }
}
