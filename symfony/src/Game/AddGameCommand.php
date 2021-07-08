<?php

namespace App\Game;

use App\DDD\CommandInterface;

class AddGameCommand implements CommandInterface
{
    public int $id;

    public static function createFromArray(array $data): self
    {
        $command = new self();
        $command->id = $data['rawgId'];

        return $command;
    }
}