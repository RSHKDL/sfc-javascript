<?php

namespace App\Tool;

class VatCalculator
{
    public function apply(float $price, float $tax): float
    {
        return round($price + $price * ($tax/100), 2, PHP_ROUND_HALF_UP);
    }
}