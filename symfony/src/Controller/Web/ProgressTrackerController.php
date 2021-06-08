<?php

namespace App\Controller\Web;

use App\GamePlayed\Form\NewGamePlayedType;
use App\Repository\GamePlayedRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProgressTrackerController extends AbstractController
{
    private GamePlayedRepository $gamePlayedRepository;

    public function __construct(GamePlayedRepository $gamePlayedRepository)
    {
        $this->gamePlayedRepository = $gamePlayedRepository;
    }

    /**
     * @Route("/progress-tracker", name="progress-tracker")
     */
    public function index(): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $form = $this->createForm(NewGamePlayedType::class);

        return $this->render('progress_tracker/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
