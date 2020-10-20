<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ExampleController extends AbstractController
{
    /**
     * @Route("/", name="example")
     * @return Response
     */
    public function index(LoggerInterface $logger): Response
    {
        $logger->info('Hey! This is the logger.');
        $logger->alert('Oh no! Something bad happened.', [
            'cause' => 'unknown'
        ]);

        return $this->render('example/index.html.twig');
    }
}