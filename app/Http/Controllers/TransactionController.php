<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function show(Transaction $transaction)
    {
        return inertia('Transactions/Show', [
            'transaction' => $transaction->load('details.variation'),
        ]);
    }
}
