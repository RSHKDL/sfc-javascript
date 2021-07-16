<?php

namespace App\DataFixtures;

use App\Entity\Game;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GameFixtures extends Fixture
{
    use FixturesTrait;

    public function load(ObjectManager $manager)
    {
        $gamesData = $this->loadData("games");
        foreach ($gamesData as $gameData) {
            $game = new Game(
                $gameData["name"],
                $gameData["slug"],
                $gameData["rawg_id"]
            );
            if ($gameData["achievements"] !== null) {
                $game->setAchievements($gameData["achievements"]);
            }
            $manager->persist($game);
            $this->addReference($gameData["name"], $game);
        }

        $manager->flush();
    }
}
