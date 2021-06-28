<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

abstract class AbstractApiController extends AbstractController
{
    private SerializerInterface $serializer;

    public function __construct(
        SerializerInterface $serializer
    ) {
        $this->serializer = $serializer;
    }

    protected function createApiResponse($data, array $groups = [], int $statusCode = 200): JsonResponse
    {
        $json = $this->serializer->serialize($data, 'json', ['groups' => $groups]);

        return new JsonResponse($json, $statusCode, [], true);
    }
}