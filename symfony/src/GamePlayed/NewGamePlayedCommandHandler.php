<?php

namespace App\GamePlayed;

use App\DDD\CommandHandlerInterface;
use App\DDD\CommandInterface;
use App\Entity\GamePlayed;
use App\Repository\GamePlayedRepository;
use App\Repository\GameRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use GameAlreadyTrackedException;
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
     * @throws GameAlreadyTrackedException
     */
    public function handle(CommandInterface $command): GamePlayed
    {
        $this->supports($command);

        $user = $this->tokenStorage->getToken()->getUser();
        $gamesPlayed = $this->gamePlayedRepository->findBy(['player' => $user]);
        $game = $this->gameRepository->find($command->game);

        foreach ($gamesPlayed as $gamePlayed) {
            $game2 = $gamePlayed->getGame();
            if ($game === $game2) {
                throw new GameAlreadyTrackedException();
            }
        }

        $gamePlayed = new GamePlayed(
            $game,
            $user
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