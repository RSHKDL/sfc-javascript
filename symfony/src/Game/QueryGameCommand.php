<?php

namespace App\Game;

use App\DDD\CommandInterface;

class QueryGameCommand implements CommandInterface
{
    public string $game;
}