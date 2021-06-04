<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PlayerRepository::class)
 */
class Player extends User
{
    /**
     * @ORM\OneToMany(targetEntity=GamePlayed::class, mappedBy="player")
     */
    private Collection $gamesPlayed;

    public function __construct()
    {
        parent::__construct();
        $this->gamesPlayed = new ArrayCollection();
    }

    /**
     * @return Collection|GamePlayed[]
     */
    public function getGamesPlayed(): Collection
    {
        return $this->gamesPlayed;
    }

    public function addGamesPlayed(GamePlayed $gamesPlayed): self
    {
        if (!$this->gamesPlayed->contains($gamesPlayed)) {
            $this->gamesPlayed[] = $gamesPlayed;
            $gamesPlayed->setPlayer($this);
        }

        return $this;
    }

    public function removeGamesPlayed(GamePlayed $gamesPlayed): self
    {
        if ($this->gamesPlayed->removeElement($gamesPlayed)) {
            // set the owning side to null (unless already changed)
            if ($gamesPlayed->getPlayer() === $this) {
                $gamesPlayed->setPlayer(null);
            }
        }

        return $this;
    }
}
