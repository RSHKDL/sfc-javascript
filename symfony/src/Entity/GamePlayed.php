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
    private ?int $completionTime;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private ?int $achievements;

    public function __construct(Game $game, Player $player)
    {
        $this->game = $game;
        $this->player = $player;
    }

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

    public function getCompletionTime(): ?int
    {
        return $this->completionTime;
    }

    public function setCompletionTime(int $completionTime): self
    {
        $this->completionTime = $completionTime;

        return $this;
    }

    public function getAchievements(): ?int
    {
        return $this->achievements;
    }

    public function setAchievements(?int $achievements): self
    {
        $this->achievements = $achievements;

        return $this;
    }
}
