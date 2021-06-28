<?php

namespace App\Controller\Web;

use App\Game\Form\QueryGameType;
use App\Repository\GameRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    private GameRepository $gameRepository;

    public function __construct(GameRepository $gameRepository)
    {
        $this->gameRepository = $gameRepository;
    }

    /**
     * @Route("/games", name="games")
     */
    public function index(): Response
    {
        $form = $this->createForm(QueryGameType::class);
        $games = $this->gameRepository->findAll();

        return $this->render('game/index.html.twig', [
            'form' => $form->createView(),
            'games' => $games,
        ]);
    }
}
