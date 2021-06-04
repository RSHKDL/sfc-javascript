<?php

namespace App\Controller;

use App\Form\GamePlayedType;
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
    public function index(Request $request): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $form = $this->createForm(GamePlayedType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $gamePlayed = $form->getData();
            $gamePlayed->setPlayer($this->getUser());

            $em->persist($gamePlayed);
            $em->flush();

            return $this->redirectToRoute('progress-tracker');
        }

        $gamesPlayed = $this->gamePlayedRepository->findBy(['player' => $this->getUser()]);

        return $this->render('progress_tracker/index.html.twig', [
            'form' => $form->createView(),
            'gamesPlayed' => $gamesPlayed
        ]);
    }
}
