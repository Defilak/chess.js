<?php

namespace Defi\Chess\Figures;

use Defi\Chess\Board;

abstract class Figure
{
    protected $x;

    protected $y;

    protected $color;

    protected Board $board;

    public abstract function move($h, $v);

    public abstract function canMove(Board $board, $x, $y);

    public abstract function getAvailableMoves(): array;

    public function setBoard(Board $board)
    {
        $this->board = $board;
    }

    /**
     * Get the value of color
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set the value of color
     *
     * @return  self
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get the value of x
     */
    public function getX()
    {
        return $this->x;
    }

    /**
     * Set the value of x
     *
     * @return  self
     */
    public function setX($x)
    {
        $this->x = $x;

        return $this;
    }

    /**
     * Get the value of y
     */
    public function getY()
    {
        return $this->y;
    }

    /**
     * Set the value of y
     *
     * @return  self
     */
    public function setY($y)
    {
        $this->y = $y;

        return $this;
    }
}
