<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'order_id' => $this->order_id,
            'transaction_status' => $this->transaction_status,
            'settlement_time' => $this->settlement_time?->format('j M Y, g:i A'),
            'transaction_time' => $this->transaction_time?->format('j M Y, g:i A'),
            'order_status' => $this->order_status->value,
            'gross_amount' => number_format($this->gross_amount, 0, '.', '.'),
            'shipping_information' => $this->shipping_information,
            'payment_method' => $this->payment_method,
            'customer' => [
                'name' => $this->customer->name,
                'address' => $this->customer?->defaultShippingAddress,
                'province' => $this->customer?->defaultShippingAddress->province->name,
                'city' => $this->customer?->defaultShippingAddress->city->name,
                'subdistrict' => $this->customer?->defaultShippingAddress->subdistrict?->name,
            ],
            'details' => TransactionDetailResource::collection($this->details),
        ];
    }
}
