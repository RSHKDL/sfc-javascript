<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 */
class Game
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private string $slug;

    /**
     * @ORM\Column(type="integer", unique=true)
     */
    private string $rawgId;

    /**
     * @ORM\OneToMany(targetEntity=GamePlayed::class, mappedBy="game")
     */
    private Collection $playedBy;

    public function __construct(string $name, string $slug, int $rawgId)
    {
        $this->name = $name;
        $this->slug = $slug;
        $this->rawgId = $rawgId;
        $this->playedBy = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function getRawgId(): ?int
    {
        return $this->rawgId;
    }

    /**
     * @return Collection|GamePlayed[]
     */
    public function getPlayedBy(): Collection
    {
        return $this->playedBy;
    }

    public function addPlayedBy(GamePlayed $gamesPlayed): self
    {
        if (!$this->playedBy->contains($gamesPlayed)) {
            $this->playedBy[] = $gamesPlayed;
            $gamesPlayed->setGame($this);
        }

        return $this;
    }

    public function removePlayedBy(GamePlayed $gamesPlayed): self
    {
        if ($this->playedBy->removeElement($gamesPlayed)) {
            // set the owning side to null (unless already changed)
            if ($gamesPlayed->getGame() === $this) {
                $gamesPlayed->setGame(null);
            }
        }

        return $this;
    }
}
