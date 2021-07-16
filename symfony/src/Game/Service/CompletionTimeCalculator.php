<?php

namespace App\Game\Service;

use App\Entity\Game;
use http\Exception\InvalidArgumentException;

final class CompletionTimeCalculator
{
    public const MEDIAN = 'median';
    public const AVERAGE = 'average';

    public function calculate(Game $game, string $mode): Game
    {
        $completionTimes = $this->getGamesPlayed($game);

        switch ($mode) {
            case self::AVERAGE:
                $completionTime = $this->calculateAverage($completionTimes);
                break;
            case self::MEDIAN:
                $completionTime = $this->calculateMedian($completionTimes);
                break;
            default:
                throw new InvalidArgumentException();
        }

        $game->setAverageCompletionTime($completionTime);

        return $game;
    }

    private function getGamesPlayed(Game $game): array
    {
        $gamesPlayed = $game->getPlayedBy();
        $completionTimes = [];
        foreach ($gamesPlayed as $gamePlayed) {
            $completionTimes[] = $gamePlayed->getCompletionTime();
        }

        return $completionTimes;
    }

    private function calculateAverage(array $numbers): int
    {
        $max = count($numbers);

        if (!$max) {
            $result = 0;
        } else {
            $sum = array_sum($numbers);
            $result = $sum / $max;
        }

        return $result;
    }

    private function calculateMedian(array $numbers): int
    {
        $max = count($numbers);
        if (!$max) {
            return 0;
        }

        sort($numbers);
        $index = (int) floor($max/2);
        $bitwiseAnd = $max & 1;

        if ($bitwiseAnd == 1) {
            $result = $numbers[$index];
        } else {
            $result = (int) ceil(($numbers[$index - 1] + $numbers[$index]) / 2);
        }

        return $result;
    }
}