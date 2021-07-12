<?php

namespace App\GamePlayed;

use App\DDD\CommandInterface;
use App\Entity\Game;
use Symfony\Component\Validator\Constraints as Assert;

class NewGamePlayedCommand implements CommandInterface
{
    public int $game;

    /**
     * @Assert\GreaterThanOrEqual(value="0", message="Completion time must be a positive integer")
     */
    public ?int $completionTime;

    /**
     * @Assert\GreaterThanOrEqual(value="0", message="Achievements must be a positive integer")
     */
    public ?int $achievements;
}