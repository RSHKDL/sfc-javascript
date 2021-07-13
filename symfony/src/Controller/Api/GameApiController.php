<?php

namespace App\Controller\Api;

use App\Api\ApiRoute;
use App\Entity\Game;
use App\Game\AddGameCommand;
use App\Game\AddGameCommandHandler;
use App\Game\DisplayGamesQueryHandler;
use App\Game\Form\QueryGameType;
use App\Game\Model\GameModel;
use App\Game\QueryGameCommandHandler;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GameApiController
 * @ApiRoute()
 */
class GameApiController extends AbstractApiController
{
    /**
     * @Route("/games/find",
     *     name="game_find",
     *     methods={"POST"},
     *     options={"expose"=true})
     */
    public function findGameToAdd(Request $request, QueryGameCommandHandler $commandHandler): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (null === $data) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $form = $this->createForm(QueryGameType::class, null);
        $form->submit($data);

        $command = $form->getData();
        $data = $commandHandler->handle($command);

        return new JsonResponse($data);
    }

    /**
     * @Route("/games",
     *     name="game_add",
     *     methods={"POST"},
     *     options={"expose"=true})
     */
    public function addGame(Request $request, AddGameCommandHandler $commandHandler): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (null === $data) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        /**
         * @todo maybe use validation instead of catching this very specific exception.
         */

        try {
            $game = $commandHandler->handle(AddGameCommand::createFromArray($data));
            $response = $this->createApiResponse(null, [], Response::HTTP_NO_CONTENT);
            $response->headers->set(
                'Location',
                $this->generateUrl('api_game_show', ['id' => $game->getId()])
            );
        } catch (UniqueConstraintViolationException $exception) {
            $response = $this->createApiResponse('This game is already tracked.', [], Response::HTTP_CONFLICT);
        } catch (\Throwable $throwable) {
            $response = $this->createApiResponse('An unexpected error occurred.', [], Response::HTTP_BAD_REQUEST);
        }

        return $response;
    }

    /**
     * @Route("/games/{id}",
     *     name="game_show",
     *     methods={"GET"},
     *     options={"expose"=true})
     */
    public function getGame(Game $game): JsonResponse
    {
        $game = GameModel::createFromEntity($game);

        return new JsonResponse($game);
    }

    /**
     * @Route("/games",
     *     name="game_list",
     *     methods={"GET"},
     *     options={"expose"=true})
     */
    public function getGames(DisplayGamesQueryHandler $queryHandler): Response
    {
        $games = $queryHandler->handle();

        return new JsonResponse($games);
    }
}