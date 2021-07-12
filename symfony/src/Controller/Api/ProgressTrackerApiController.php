<?php

namespace App\Controller\Api;

use App\Entity\GamePlayed;
use App\GamePlayed\Form\NewGamePlayedType;
use App\GamePlayed\Model\GamePlayedModel;
use App\GamePlayed\NewGamePlayedCommandHandler;
use App\Repository\GamePlayedRepository;
use App\Repository\GameRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProgressTrackerApiController extends AbstractApiController
{
    private GamePlayedRepository $gamePlayedRepository;
    private GameRepository $gameRepository;
    private NewGamePlayedCommandHandler $newGamePlayedCommandHandler;

    public function __construct(
        GamePlayedRepository $gamePlayedRepository,
        GameRepository $gameRepository,
        SerializerInterface $serializer,
        NewGamePlayedCommandHandler $newGamePlayedCommandHandler
    ) {
        parent::__construct($serializer);
        $this->gamePlayedRepository = $gamePlayedRepository;
        $this->gameRepository = $gameRepository;
        $this->newGamePlayedCommandHandler = $newGamePlayedCommandHandler;
    }

    /**
     * @Route("/track-progress",
     *     name="game_played_list",
     *     methods={"GET"},
     *     options={"expose"=true})
     */
    public function getGamesPlayed(): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $gamesPlayed = $this->gamePlayedRepository->findBy(['player' => $this->getUser()]);
        $items = [];
        foreach ($gamesPlayed as $gamePlayed) {
            $items[] = $this->createGamePlayedModelFromEntity($gamePlayed);
        }

        return $this->createApiResponse($items, ['game_played_list']);
    }

    /**
     * @Route("/track-progress/{id}", name="game_played_show", methods={"GET"})
     */
    public function getGamePlayed(GamePlayed $gamePlayed): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $item = $this->createGamePlayedModelFromEntity($gamePlayed);

        return $this->createApiResponse($item, ['game_played_show']);
    }

    /**
     * @Route("/track-progress",
     *     name="game_played_create",
     *     methods={"POST"},
     *     options={"expose"=true})
     */
    public function createGamePlayed(Request $request, NewGamePlayedCommandHandler $commandHandler): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $data = json_decode($request->getContent(), true);
        if (null === $data) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $form = $this->createForm(NewGamePlayedType::class, null);
        $form->submit($data);

        if (!$form->isValid()) {
            $errors = $this->getErrorsFromForm($form);

            return $this->createApiResponse(
                ['errors' => $errors],
                [],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $command = $form->getData();
            $gamePlayed = $commandHandler->handle($command);
        } catch (\Throwable $throwable) {
            return $this->createApiResponse(
                ['errors' => $throwable->getMessage()],
                [],
                Response::HTTP_BAD_REQUEST
            );
        }

        $gamePlayedModel = $this->createGamePlayedModelFromEntity($gamePlayed);
        $response = $this->createApiResponse($gamePlayedModel, ['game_played_show'], Response::HTTP_CREATED);
        $response->headers->set(
            'Location',
            $this->generateUrl('api_game_played_show', ['id' => $gamePlayed->getId()])
        );

        return $response;
    }

    /**
     * @Route("/track-progress/{id}",
     *     name="game_played_delete",
     *     methods={"DELETE"},
     *     options={"expose"=true})
     */
    public function deleteGamePlayed(GamePlayed $gamePlayed): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $em = $this->getDoctrine()->getManager();
        $em->remove($gamePlayed);
        $em->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Turns a GamePlayed into a GamePlayedModel for the API.
     *
     * This should be moved into a service if it needed to be
     * re-used elsewhere.
     */
    protected function createGamePlayedModelFromEntity(GamePlayed $gamePlayed): GamePlayedModel
    {
        $model = GamePlayedModel::createFromEntity($gamePlayed);
        $url = $this->generateUrl('api_game_played_show', ['id' => $gamePlayed->getId()]);
        $model->addLink('_self', $url);

        return $model;
    }
}