<?php

namespace App\Controller\Api;

use App\Api\Model\GamePlayedApiModel;
use App\Entity\GamePlayed;
use App\GamePlayed\Form\NewGamePlayedType;
use App\GamePlayed\NewGamePlayedCommandHandler;
use App\Repository\GamePlayedRepository;
use App\Repository\GameRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProgressTrackerApiController extends AbstractController
{
    private GamePlayedRepository $gamePlayedRepository;
    private GameRepository $gameRepository;
    private SerializerInterface $serializer;
    private NewGamePlayedCommandHandler $newGamePlayedCommandHandler;

    public function __construct(
        GamePlayedRepository $gamePlayedRepository,
        GameRepository $gameRepository,
        SerializerInterface $serializer,
        NewGamePlayedCommandHandler $newGamePlayedCommandHandler
    ) {
        $this->gamePlayedRepository = $gamePlayedRepository;
        $this->gameRepository = $gameRepository;
        $this->serializer = $serializer;
        $this->newGamePlayedCommandHandler = $newGamePlayedCommandHandler;
    }

    /**
     * @Route("/games", name="game_played_list", methods={"GET"})
     */
    public function getGamesPlayed(): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $gamesPlayed = $this->gamePlayedRepository->findBy(['player' => $this->getUser()]);
        $items = [];
        foreach ($gamesPlayed as $gamePlayed) {
            $items[] = new GamePlayedApiModel(
                $gamePlayed->getGame()->getName(),
                $gamePlayed->getPlayer()->getEmail(),
                $gamePlayed->getTimeSpent()
            );
        }

        return $this->createApiResponse($items, ['game_played_list']);
    }

    /**
     * @Route("/games/{id}", name="game_played_show", methods={"GET"})
     */
    public function getGamePlayed(GamePlayed $gamePlayed): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $item = new GamePlayedApiModel(
            $gamePlayed->getGame()->getName(),
            $gamePlayed->getPlayer()->getEmail(),
            $gamePlayed->getTimeSpent()
        );

        return $this->createApiResponse($item, ['game_played_show']);
    }

    /**
     * @Route("/games", name="game_played_create", methods={"POST"})
     */
    public function createGamePlayed(Request $request): JsonResponse
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

        $command = $form->getData();
        $gamePlayed = $this->newGamePlayedCommandHandler->handle($command);
        $gamePlayedApiModel = $this->createGamePlayedApiModel($gamePlayed);

        return $this->createApiResponse(
            $gamePlayedApiModel,
            ['game_played_show'],
            Response::HTTP_CREATED
        );
    }

    /**
     * @Route("/games/{id}", name="game_played_delete", methods={"DELETE"})
     */
    public function deleteGamePlayed(GamePlayed $gamePlayed): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $em = $this->getDoctrine()->getManager();
        $em->remove($gamePlayed);
        $em->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    protected function createApiResponse($data, array $groups = [], int $statusCode = 200): JsonResponse
    {
        $json = $this->serializer->serialize($data, 'json', ['groups' => $groups]);

        return new JsonResponse($json, $statusCode, [], true);
    }

    /**
     * Returns an associative array of validation errors
     *
     * {
     *     'firstName': 'This value is required',
     *     'subForm': {
     *         'someField': 'Invalid value'
     *     }
     * }
     *
     * @param FormInterface $form
     * @return array|string
     */
    protected function getErrorsFromForm(FormInterface $form)
    {
        foreach ($form->getErrors() as $error) {
            // only supporting 1 error per field
            // and not supporting a "field" with errors, that has more
            // fields with errors below it
            return $error->getMessage();
        }

        $errors = array();
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childError = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childError;
                }
            }
        }

        return $errors;
    }

    /**
     * Turns a GamePlayed into a GamePlayedApiModel for the API.
     *
     * This should be moved into a service if it needed to be
     * re-used elsewhere.
     */
    protected function createGamePlayedApiModel(GamePlayed $gamePlayed): GamePlayedApiModel
    {
        $model = new GamePlayedApiModel(
            $gamePlayed->getGame()->getName(),
            $gamePlayed->getPlayer()->getUsername(),
            $gamePlayed->getTimeSpent()
        );

        $url = $this->generateUrl('api_game_played_show', ['id' => $gamePlayed->getId()]);
        $model->addLink('_self', $url);

        return $model;
    }
}