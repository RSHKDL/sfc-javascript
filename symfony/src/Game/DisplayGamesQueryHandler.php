<?php

namespace App\Game;

use App\Game\Model\GameModel;
use App\Repository\GameRepository;

class DisplayGamesQueryHandler
{
    private GameRepository $repository;

    public function __construct(GameRepository $repository)
    {
        $this->repository = $repository;
    }

    public function handle()
    {
        $games = $this->repository->findAll();
        $gamesModel = [];
        foreach ($games as $game) {
            $gamesModel[] = GameModel::createFromEntity($game);
        }

        return $gamesModel;
    }
}