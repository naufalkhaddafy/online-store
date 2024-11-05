<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function download(Transaction $transaction)
    {
        $pdf = app('dompdf.wrapper')->loadView('invoice', ['transaction' => $transaction]);
        $name = $transaction->order_id . '.' . 'pdf';

        return $pdf->download($name);
    }
}
