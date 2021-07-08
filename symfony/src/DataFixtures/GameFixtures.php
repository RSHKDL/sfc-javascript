<?php

namespace App\DataFixtures;

use App\Entity\Game;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GameFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for($i = 0; $i < 5; $i++) {
            $game = new Game(
                "fake game n°{$i}",
                "fake-game-slug-{$i}",
                111+$i
            );
            $game->setAchievements(mt_rand(0, 100));
            $manager->persist($game);
            $this->addReference("game_{$i}", $game);
        }

        $manager->flush();
    }
}
