<?php

namespace Defi\Chess;

class Game
{
    private Player $player1;
    private Player $player2;

    private Board $board;

    public function __construct()
    {
        $board = new Board();
    }

    public function start()
    {

    }
}
