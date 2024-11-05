<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserTransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $transactions = Transaction::query()->whereBelongsTo($request->user(), 'customer')->latest()->paginate(12);

        return inertia('Dashboard', [
            'transactions' => UserTransactionResource::collection($transactions)->additional([
                'meta' => [
                    'has_pages' => $transactions->hasPages(),
                ],
            ]),
        ]);
    }
}
