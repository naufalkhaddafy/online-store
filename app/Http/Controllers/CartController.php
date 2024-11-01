<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Variation;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $carts = Cart::query()
            ->whereBelongsTo(auth()->user())
            ->whereNull('placed_at')
            ->with('variation.product')
            ->latest()
            ->get();

        $orderSummary = [
            'subtotal' => number_format($subtotal = $carts->sum(fn($cart) => $cart->quantity * $cart->price), 0, '.', '.'),
            'tax' => number_format($tax = taxCalculation($subtotal), 0, '.', '.'),
            'total' => number_format($subtotal + $tax, 0, '.', '.'),
        ];

        $resource = CartResource::collection($carts);

        return inertia('Cart/Index', [
            'carts' => $resource,
            'orderSummary' => $orderSummary,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $variation = Variation::findOrFail($request->variation_id);
        $existsQty = $request->user()->carts()->where('variation_id', $variation->id)->value('quantity');
        $request->user()->carts()->whereNull('placed_at')->updateOrCreate(
            ['variation_id' => $variation->id],
            [
                'variation_id' => $variation->id,
                'quantity' => $request->quantity + $existsQty,
                'price' => $variation->price,
            ]
        );

        return to_route('carts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        $cart->update($request->only('quantity'));

        return to_route('carts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return back();
    }
}
