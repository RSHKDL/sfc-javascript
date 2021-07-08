<?php

namespace App\Game;

use App\DDD\CommandHandlerInterface;
use App\DDD\CommandInterface;
use App\Game\Model\GameModel;
use App\Tool\Slugify;
use http\Exception\InvalidArgumentException;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class QueryGameCommandHandler implements CommandHandlerInterface
{
    private string $apiKey;
    private Slugify $slugify;
    private HttpClientInterface $httpClient;

    public function __construct(
        string $apiKey,
        Slugify $slugify,
        HttpClientInterface $httpClient
    ) {
        $this->apiKey = $apiKey;
        $this->slugify = $slugify;
        $this->httpClient = $httpClient;
    }

    public function handle(CommandInterface $command): array
    {
        $this->supports($command);
        $game = $this->slugify->slugify($command->game);

        try {
            $apiResponse = $this->httpClient->request(
                'GET',
                $this->buildUrl($game)
            );
            $arrayResponse = $apiResponse->toArray();
        } catch (TransportExceptionInterface $exception) {
            dd($exception);
        } catch (\Throwable $throwable) {
            dd($throwable);
        }

        $response = [];
        foreach ($arrayResponse['results'] as $game) {
            $response[] = GameModel::createFromArray($game);
        }

        return $response;
    }

    public function supports(CommandInterface $command): void
    {
        if(!$command instanceof QueryGameCommand) {
            throw new InvalidArgumentException();
        }
    }

    private function buildUrl(string $game): string
    {
        return "https://api.rawg.io/api/games?search={$game}&stores=1&search_precise=1&search_exact=1&key={$this->apiKey}";
    }
}