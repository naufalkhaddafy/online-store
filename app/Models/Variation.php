<?php

namespace App\Models;

use App\Traits\HasStocks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Variation extends Model
{
    use HasStocks;
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
