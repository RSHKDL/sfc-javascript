<?php

namespace App\Game\Model;

use App\Entity\Game;

final class GameModel
{
    public ?int $id;
    public ?int $rawgId;
    public ?string $slug;
    public ?string $name;

    public static function createFromArray(array $data): self
    {
        $model = new self();
        $model->rawgId = $data['id'];
        $model->slug = $data['slug'];
        $model->name = $data['name'];

        return $model;
    }

    public static function createFromEntity(Game $game): self
    {
        $model = new self();
        $model->id = $game->getId();
        $model->rawgId = $game->getRawgId();
        $model->slug = $game->getSlug();
        $model->name = $game->getName();

        return $model;
    }
}