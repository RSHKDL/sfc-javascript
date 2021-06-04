<?php

namespace App\DataFixtures;

use App\Entity\Game;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GameFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $names = [
            'Skyrim Legendary Edition',
            'Darkest Dungeon',
            'XCOM 2'
        ];

        foreach ($names as $name) {
            $game = new Game($name);
            $manager->persist($game);
        }

        $manager->flush();
    }
}
