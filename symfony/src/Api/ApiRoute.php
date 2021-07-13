<?php

namespace App\Api;

use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiRoute
 * @Annotation
 */
class ApiRoute extends Route
{
    public function getDefaults()
    {
        return array_merge(
            ['_is_api' => true],
            parent::getDefaults()
        );
    }
}