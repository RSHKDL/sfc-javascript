<?php

namespace App\Controller\Web;

use App\Api\Model\GamePlayedModel;
use App\GamePlayed\Form\NewGamePlayedType;
use App\Repository\GamePlayedRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProgressTrackerController extends AbstractController
{
    private GamePlayedRepository $gamePlayedRepository;
    private SerializerInterface $serializer;

    public function __construct(
        GamePlayedRepository $gamePlayedRepository,
        SerializerInterface $serializer
    ) {
        $this->gamePlayedRepository = $gamePlayedRepository;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/progress-tracker", name="progress_tracker")
     * @todo It's time for a factory or something...
     */
    public function index(): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $form = $this->createForm(NewGamePlayedType::class);

        $gamesPlayed = $this->gamePlayedRepository->findBy(['player' => $this->getUser()]);
        $items = [];
        foreach ($gamesPlayed as $gamePlayed) {
            $model = GamePlayedModel::createFromEntity($gamePlayed);
            $url = $this->generateUrl('api_game_played_show', ['id' => $gamePlayed->getId()]);
            $model->addLink('_self', $url);
            $items[] = $model;
        }
        $gamesPlayedJson = $this->serializer->serialize($items, 'json', ['groups' => ['game_played_list']]);

        return $this->render('progress_tracker/index.html.twig', [
            'form' => $form->createView(),
            'gamesPlayedJson' => $gamesPlayedJson
        ]);
    }
}
