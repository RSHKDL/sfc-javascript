<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GameFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // fixtures not needed since calls to rawg api are implemented
    }
}
