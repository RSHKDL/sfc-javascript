<?php

namespace App\DataFixtures;

use App\Entity\GamePlayed;
use App\Game\Service\CompletionTimeCalculator;
use App\Repository\GameRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class GamePlayedFixtures extends Fixture implements DependentFixtureInterface
{
    use FixturesTrait;

    private GameRepository $gameRepository;
    private CompletionTimeCalculator $completionTimeCalculator;

    public function __construct(
        GameRepository $gameRepository,
        CompletionTimeCalculator $completionTimeCalculator
    ) {
        $this->gameRepository = $gameRepository;
        $this->completionTimeCalculator = $completionTimeCalculator;
    }

    public function getDependencies()
    {
        return [
            GameFixtures::class,
            UserFixtures::class
        ];
    }

    public function load(ObjectManager $manager)
    {
        $gamesPlayedData = $this->loadData('gamesPlayed');
        foreach ($gamesPlayedData as $gamePlayedData) {
            $gamePlayed = new GamePlayed(
                $this->getReference($gamePlayedData["gameName"]),
                $this->getReference($gamePlayedData["playerName"])
            );
            $gamePlayed->setCompletionTime($gamePlayedData["completionTime"]);
            $gamePlayed->setAchievements($gamePlayedData["achievements"]);
            $manager->persist($gamePlayed);
        }

        $manager->flush();

        $this->updateGamesCompletionTime($manager);
    }

    private function updateGamesCompletionTime(ObjectManager $manager): void
    {
        $games = $this->gameRepository->findAll();
        foreach ($games as $game) {
            $this->completionTimeCalculator->calculate($game, CompletionTimeCalculator::MEDIAN);
            $manager->persist($game);
        }

        $manager->flush();
    }
}