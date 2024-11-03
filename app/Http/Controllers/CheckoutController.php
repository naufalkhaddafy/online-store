<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Courier;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $couriers = Courier::query()
            ->where('enabled', true)
            ->get()
            ->map(fn($courier) => [
                'id' => $courier->code,
                'name' => $courier->name,
                'code' => $courier->code,
            ]);

        $carts = Cart::query()
            ->whereBelongsTo(auth()->user())
            ->whereNotNull('placed_at')
            ->with('variation.product')
            ->latest()
            ->get();

        abort_if($carts->count() === 0, 404);

        $totalWeight = $request->user()->carts->sum(fn($cart) => $cart->variation->weight * $cart->quantity);
        $shippingAddress = $request->user()->defaultShippingAddress?->load('province:id,name', 'city:id,name,postal_code', 'subdistrict:id,name');

        $orderSummary = [
            'subtotal' => number_format($subtotal = $carts->sum(fn($cart) => $cart->quantity * $cart->price), 0, '.', '.'),
            'tax' => number_format($tax = taxCalculation($subtotal), 0, '.', '.'),
            'total' => number_format($subtotal + $tax, 0, '.', '.'),
        ];

        return inertia('Checkout/Index', [
            'carts' => CartResource::collection($carts),
            'couriers' => $couriers,
            'total_weight' => $totalWeight,
            'shipping_address' => $shippingAddress,
            'order_summary' => $orderSummary,
        ]);
    }

    public function create(Request $request)
    {
        Cart::query()
            ->whereBelongsTo($request->user())
            ->whereNull('placed_at')
            ->with('variation')
            ->latest()
            ->get()
            ->each(fn($cart) => $cart->update(['placed_at' => now()]));

        return to_route('checkout.index');
    }

    public function store(Request $request)
    {
        //
    }
}
