<?php

namespace Defi\Chess\Figures;

use Defi\Chess\Board;

/**
 * Ладья
 */
class Rook extends Figure
{
    public function move($h, $v)
    {
        //throw new WrongMoveException("Неверный ход $x$y");
    }

    public function canMove(Board $board, $x, $y)
    {
        if($x < 0 || $x > 8 || $y < 0 || $y > 8) {
            return false;
        }

        
    }

    public function getAvailableMoves(): array
    {
        return [];
    }
}
