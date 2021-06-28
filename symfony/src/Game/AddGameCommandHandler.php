<?php

namespace App\Game;

use App\DDD\CommandHandlerInterface;
use App\DDD\CommandInterface;
use App\Entity\Game;
use App\Repository\GameRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use InvalidArgumentException;

class AddGameCommandHandler implements CommandHandlerInterface
{
    private GameRepository $gameRepository;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function handle(CommandInterface $command)
    {
        $this->supports($command);

        $game = new Game($command->name, $command->slug, $command->rawgId);
        $this->gameRepository->save($game);

        return $game;
    }

    public function supports(CommandInterface $command): void
    {
        if(!$command instanceof AddGameCommand) {
            throw new InvalidArgumentException();
        }
    }
}