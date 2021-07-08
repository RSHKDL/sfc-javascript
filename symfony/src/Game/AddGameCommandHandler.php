<?php

namespace App\Game;

use App\DDD\CommandHandlerInterface;
use App\DDD\CommandInterface;
use App\Entity\Game;
use App\Game\Model\GameModel;
use App\Repository\GameRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use InvalidArgumentException;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class AddGameCommandHandler implements CommandHandlerInterface
{
    private string $apiKey;
    private HttpClientInterface $httpClient;
    private GameRepository $gameRepository;

    public function __construct(
        string $apiKey,
        HttpClientInterface $httpClient,
        GameRepository $gameRepository
    ) {
        $this->apiKey = $apiKey;
        $this->httpClient = $httpClient;
        $this->gameRepository = $gameRepository;
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function handle(CommandInterface $command)
    {
        $this->supports($command);

        try {
            $apiResponse = $this->httpClient->request(
                'GET',
                $this->buildUrl($command->id)
            );
            $arrayResponse = $apiResponse->toArray();
        } catch (TransportExceptionInterface $exception) {
            dd($exception);
        } catch (\Throwable $throwable) {
            dd($throwable);
        }

        $model = GameModel::createFromArray($arrayResponse);

        $game = new Game($model->name, $model->slug, $model->rawgId);
        $game->setAchievements($model->achievements);
        $this->gameRepository->save($game);

        return $game;
    }

    public function supports(CommandInterface $command): void
    {
        if(!$command instanceof AddGameCommand) {
            throw new InvalidArgumentException();
        }
    }

    private function buildUrl(int $id): string
    {
        return "https://api.rawg.io/api/games/{$id}?key={$this->apiKey}";
    }
}