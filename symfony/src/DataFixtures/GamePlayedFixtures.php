<?php

namespace App\DataFixtures;

use App\Entity\GamePlayed;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class GamePlayedFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies()
    {
        return [
            GameFixtures::class,
            UserFixtures::class
        ];
    }

    public function load(ObjectManager $manager)
    {
        for($i = 0; $i < 5; $i++) {
            $gamePlayed = new GamePlayed();
            $gamePlayed->setPlayer($this->getReference('player_1'));
            $gamePlayed->setGame($this->getReference("game_{$i}"));
            $gamePlayed->setTimeSpent(mt_rand(50, 200));
            $manager->persist($gamePlayed);
        }

        $manager->flush();
    }
}