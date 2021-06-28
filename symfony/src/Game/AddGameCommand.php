<?php

namespace App\Game;

use App\DDD\CommandInterface;

class AddGameCommand implements CommandInterface
{
    public int $rawgId;
    public string $slug;
    public string $name;

    public static function createFromArray(array $data): self
    {
        $command = new self();
        $command->rawgId = $data['rawgId'];
        $command->slug = $data['slug'];
        $command->name = $data['name'];

        return $command;
    }
}