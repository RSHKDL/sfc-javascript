<?php

namespace App\GamePlayed;

use App\DDD\CommandHandlerInterface;
use App\DDD\CommandInterface;
use App\Entity\GamePlayed;
use App\Repository\GamePlayedRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use InvalidArgumentException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class NewGamePlayedCommandHandler implements CommandHandlerInterface
{
    private TokenStorageInterface $tokenStorage;
    private GamePlayedRepository $gamePlayedRepository;

    public function __construct(
        TokenStorageInterface $tokenStorage,
        GamePlayedRepository $gamePlayedRepository
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->gamePlayedRepository = $gamePlayedRepository;
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function handle(CommandInterface $command): GamePlayed
    {
        $this->supports($command);

        $gamePlayed = new GamePlayed(
            $command->game,
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