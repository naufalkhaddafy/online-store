<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionListResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TransactionController extends Controller implements HasMiddleware
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    //     $this->middleware('role:admin')->except('show');
    // }

    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('role:admin', except: ['show']),
        ];
    }

    public function index()
    {

        $transactions = Transaction::query()
            ->with(['customer', 'details.variation.product'])
            ->orderBy('order_status', 'desc')
            ->paginate();

        return inertia('Transactions/Index', [
            'transactions' => TransactionListResource::collection($transactions)->additional([
                'meta' => ['has_pages' => $transactions->hasPages()],
            ]),
        ]);
    }

    public function show(Transaction $transaction)
    {
        return inertia('Transactions/Show', [
            'transaction' => new TransactionResource($transaction->load('details.variation')),
        ]);
    }

    public function update(Transaction $transaction, Request $request)
    {
        $transaction->update($request->only('order_status'));

        return back();
    }
}
