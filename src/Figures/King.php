<?php

namespace Defi\Chess\Figures;

use Defi\Chess\Board;

/**
 * Король
 */
class King extends Figure
{
    public function move($h, $v)
    {
    }

    public function canMove(Board $board, $x, $y)
    {
        
    }

    public function getAvailableMoves(): array
    {
        return [];
    }
}
