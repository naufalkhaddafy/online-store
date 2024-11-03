<?php

namespace App\Models\Enums;

enum OrderStatus: int
{
    case PENDING = 1;
    case PROCESSING = 2;
    case SHIPPING = 3;
    case DELIVERED = 4;
}
