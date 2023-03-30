<?php

namespace Defi\Chess;

use Defi\Chess\Figures\Figure;

class Board
{
    const HORIZONTAL = 'ABCDEFGH';

    private $map = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];

    public function __construct()
    {
    }

    public function getFigure($h, $v): ?Figure
    {
        return $this->map[$v][$h];
    }

    /**
     * Получить горизонталь.
     */
    public function getHorisontal($h)
    {
        return $this->map[$h];
    }
}
