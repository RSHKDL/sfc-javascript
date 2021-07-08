<?php

namespace App\DataFixtures;

use App\Entity\Player;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        for($i = 0; $i < 2; $i++) {
            $player = new Player();
            $player->setEmail("player{$i}@test.com");
            $player->setPassword($this->encoder->encodePassword($player, 'engage'));
            $manager->persist($player);
            $this->addReference("player_{$i}", $player);
        }

        $manager->flush();
    }
}