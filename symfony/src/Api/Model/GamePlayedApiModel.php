<?php

namespace App\Api\Model;

class GamePlayedApiModel
{
    private int $id;
    private string $game;
    private string $player;
    private int $timeSpentToComplete;
    private array $links;

    public function __construct(int $id, string $game, string $player, int $timeSpentToComplete)
    {
        $this->id = $id;
        $this->game = $game;
        $this->player = $player;
        $this->timeSpentToComplete = $timeSpentToComplete;
        $this->links = [];
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getGame(): string
    {
        return $this->game;
    }

    public function getPlayer(): string
    {
        return $this->player;
    }

    public function getTimeSpentToComplete(): int
    {
        return $this->timeSpentToComplete;
    }

    public function addLink(string $ref, string $url): void
    {
        $this->links[$ref] = $url;
    }

    public function getLinks(): array
    {
        return $this->links;
    }
}