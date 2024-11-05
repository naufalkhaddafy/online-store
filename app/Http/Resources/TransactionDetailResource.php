<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionDetailResource extends JsonResource
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
            'name' => $this->name,
            'quantity' => $q = $this->quantity,
            'price' => number_format($this->price * $q, 0, '.', '.'),
            'image' => $this->variation->product->getPicture(),
            'variation' => [
                'attribute_1' => $this->variation->attribute_1,
                'attribute_2' => $this->variation->attribute_2,
            ],
        ];
    }
}
