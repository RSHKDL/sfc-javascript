<?php

namespace App\GamePlayed\Model;

use App\Entity\GamePlayed;

final class GamePlayedModel
{
    public int $id;
    public string $game;
    public string $player;
    public ?int $completionTime;
    public ?int $averageCompletionTime;
    public ?array $achievements;
    public array $links;

    public function __construct(int $id, string $game, string $player)
    {
        $this->id = $id;
        $this->game = $game;
        $this->player = $player;
        $this->links = [];
    }

    public function addLink(string $ref, string $url): void
    {
        $this->links[$ref] = $url;
    }

    public static function createFromEntity(GamePlayed $gamePlayed): self
    {
        $model = new self(
            $gamePlayed->getId(),
            $gamePlayed->getGame()->getName(),
            $gamePlayed->getPlayer()->getUsername()
        );
        $model->completionTime = $gamePlayed->getCompletionTime();
        $model->averageCompletionTime = null; //todo add avg completion time logic
        $model->achievements = [
            $gamePlayed->getAchievements(),
            $gamePlayed->getGame()->getAchievements()
        ];

        return $model;
    }
}