<?php

namespace App\Tests\Game\Service;

use App\Entity\Game;
use App\Entity\GamePlayed;
use App\Entity\Player;
use App\Game\Service\CompletionTimeCalculator;
use PHPUnit\Framework\TestCase;

class CompletionTimeCalculatorTest extends TestCase
{
    /**
     * @dataProvider valuesProvider
     */
    public function testCalculateAverage(array $dataset, int $expectedMedian, int $expectedAverage): void
    {
        $game = $this->createGameWithValues($dataset);
        $calculator = new CompletionTimeCalculator();
        $game = $calculator->calculate($game, CompletionTimeCalculator::AVERAGE);
        $this->assertEquals($expectedAverage, $game->getAverageCompletionTime());
    }

    /**
     * @dataProvider valuesProvider
     */
    public function testCalculateMedian(array $dataset, int $expectedMedian, int $expectedAverage): void
    {
        $game = $this->createGameWithValues($dataset);
        $calculator = new CompletionTimeCalculator();
        $game = $calculator->calculate($game, CompletionTimeCalculator::MEDIAN);
        $this->assertEquals($expectedMedian, $game->getAverageCompletionTime());
    }

    public function valuesProvider(): array
    {
        return [
            'no values' => [[], 0, 0],
            'odd values' => [[10, 20, 60], 20, 30],
            'even values' => [[10, 20, 30, 60], 25, 30],
            'extreme values' => [[10, 50, 60, 70, 100, 1200], 65, 248],
            'unordered values' => [[80, 42, 18, 57], 50, 49],
            'double values' => [[15, 25, 25, 35, 55], 25, 31]
        ];
    }

    private function createGameWithValues(array $dataset): Game
    {
        $game = new Game(
            'A Game',
            'a-game',
            123
        );

        $playerStub = $this->createStub(Player::class);
        $length = count($dataset);

        for ($i = 0; $i < $length; $i++) {
            $gamePlayed = new GamePlayed($game, $playerStub);
            $gamePlayed->setCompletionTime($dataset[$i]);
            $game->addPlayedBy($gamePlayed);
        }

        return $game;
    }
}