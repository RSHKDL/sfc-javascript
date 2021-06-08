<?php

namespace App\DDD;

interface CommandHandlerInterface
{
    public function handle(CommandInterface $command);
}