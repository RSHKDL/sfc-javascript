<?php

namespace App\Tests\Tool;

use App\Tool\VatCalculator;
use PHPUnit\Framework\TestCase;

class VatCalculatorTest extends TestCase
{
    /**
     * @dataProvider vatAndPriceProvider
     */
    public function testApply(float $price, float $tax, float $expected): void
    {
        $vatCalculator = new VatCalculator();
        $this->assertEquals($expected, $vatCalculator->apply($price, $tax));
    }

    public function vatAndPriceProvider(): array
    {
        return [
            '100€ at 20%' => [100, 20, 120],
            '100.00€ at 20%' => [100.00, 20, 120.00],
            '64.56€ at 5.5%' => [64.56, 5.5, 68.11],
            '123.456€ at 42%' => [123.456, 42, 175.31],
            '789.5€ at 6.666%' => [789.5, 6.666, 842.13]
        ];
    }
}
