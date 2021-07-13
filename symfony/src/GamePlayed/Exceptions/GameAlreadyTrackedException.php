<?php

class GameAlreadyTrackedException extends Exception
{
    protected $message = "You already track this game!";
}