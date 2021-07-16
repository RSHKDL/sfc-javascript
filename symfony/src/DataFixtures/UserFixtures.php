<?php

namespace App\DataFixtures;

use App\Entity\Player;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    use FixturesTrait;

    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $usersData = $this->loadData('users');
        foreach ($usersData as $userData) {
            $player = new Player();
            $player->setEmail($userData['email']);
            $player->setPassword($this->encoder->encodePassword($player, $userData['password']));
            $manager->persist($player);
            $this->addReference($userData["username"], $player);
        }

        $manager->flush();
    }


}