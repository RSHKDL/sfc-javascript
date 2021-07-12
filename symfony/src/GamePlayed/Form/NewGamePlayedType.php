<?php

namespace App\GamePlayed\Form;

use App\Entity\Game;
use App\GamePlayed\NewGamePlayedCommand;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NewGamePlayedType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('game')
            ->add('completionTime')
            ->add('achievements')
        ;
    }

    public function getBlockPrefix()
    {
        return '';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => NewGamePlayedCommand::class,
            'csrf_protection' => false,
        ]);
    }
}
