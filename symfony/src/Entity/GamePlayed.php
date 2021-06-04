<?php

namespace App\Entity;

use App\Repository\GamePlayedRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GamePlayedRepository::class)
 */
class GamePlayed
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\ManyToOne(targetEntity=Player::class, inversedBy="gamesPlayed")
     */
    private Player $player;

    /**
     * @ORM\ManyToOne(targetEntity=Game::class, inversedBy="playedBy")
     * @ORM\JoinColumn(nullable=false)
     */
    private Game $game;

    /**
     * @ORM\Column(type="integer")
     */
    private int $timeSpent;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer(): ?Player
    {
        return $this->player;
    }

    public function setPlayer(Player $player): self
    {
        $this->player = $player;

        return $this;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function getTimeSpent(): ?int
    {
        return $this->timeSpent;
    }

    public function setTimeSpent(int $timeSpent): self
    {
        $this->timeSpent = $timeSpent;

        return $this;
    }
}
