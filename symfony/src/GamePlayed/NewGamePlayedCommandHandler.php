<?php

namespace App\GamePlayed;

use App\DDD\CommandHandlerInterface;
use App\DDD\CommandInterface;
use App\Entity\GamePlayed;
use App\Repository\GamePlayedRepository;
use App\Repository\GameRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use InvalidArgumentException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class NewGamePlayedCommandHandler implements CommandHandlerInterface
{
    private TokenStorageInterface $tokenStorage;
    private GamePlayedRepository $gamePlayedRepository;
    private GameRepository $gameRepository;

    public function __construct(
        TokenStorageInterface $tokenStorage,
        GamePlayedRepository $gamePlayedRepository,
        GameRepository $gameRepository
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->gamePlayedRepository = $gamePlayedRepository;
        $this->gameRepository = $gameRepository;
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function handle(CommandInterface $command): GamePlayed
    {
        $this->supports($command);

        $game = $this->gameRepository->find($command->game);

        $gamePlayed = new GamePlayed(
            $game,
            $this->tokenStorage->getToken()->getUser()
        );

        $gamePlayed->setCompletionTime($command->completionTime);
        $gamePlayed->setAchievements($command->achievements);

        $this->gamePlayedRepository->save($gamePlayed);

        return $gamePlayed;
    }

    public function supports(CommandInterface $command): void
    {
        if(!$command instanceof NewGamePlayedCommand) {
            throw new InvalidArgumentException();
        }
    }
}