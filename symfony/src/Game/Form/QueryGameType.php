<?php

namespace App\Game\Form;

use App\Game\QueryGameCommand;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QueryGameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('game', TextType::class);
    }

    public function getBlockPrefix()
    {
        return '';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => QueryGameCommand::class,
            'csrf_protection' => false,
        ]);
    }
}