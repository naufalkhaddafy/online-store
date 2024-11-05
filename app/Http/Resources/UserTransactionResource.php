<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserTransactionResource extends JsonResource
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
            'uuid' => $this->uuid,
            'order_id' => $this->order_id,
            'gross_amount' => number_format($this->gross_amount, 0, '.', '.'),
            'order_status' => strtolower($this->order_status->name),
            'transaction_status' => $this->transaction_status,
            'shipping' => $this->shipping_information,
        ];
    }
}
