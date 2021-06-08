<?php

namespace App\GamePlayed;

use App\DDD\CommandInterface;
use App\Entity\Game;
use Symfony\Component\Validator\Constraints as Assert;

class NewGamePlayedCommand implements CommandInterface
{
    public Game $game;

    /**
     * @Assert\NotBlank(message="You must submit a time!")
     * @Assert\GreaterThan(value="0", message="You must submit a time greater than 0!")
     */
    public int $timeSpentToComplete;
}