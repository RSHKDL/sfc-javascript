<?php

namespace App\DataFixtures;

trait FixturesTrait
{
    protected function loadData(string $fileName): array
    {
        return json_decode(file_get_contents(__DIR__.'/'.$fileName.'.json'), true);
    }
}