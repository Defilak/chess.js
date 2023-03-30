<!DOCTYPE html>
<html>

<head>
    <title>Chess.js</title>

    <style>
        * {
            box-sizing: border-box;
            font-family: 'Roboto Mono', sans-serif;
        }

        html,
        body {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: lightgray;
        }

        #board_el,
        #board_overlay {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;

            border: 2px solid #c9c9c9;
        }

        #board_overlay {
            background-color: black;
            position: absolute;
            top: 2px;
            left: 66px;
        }


        #board_el>div,
        .cell {
            width: 64px;
            height: 64px;
            font-size: 64px;
            line-height: 64px;
            text-align: center;
            user-select: none;
            cursor:pointer;
        }

        .cell.white {
            background-color: #ffce9e;
            border: 2px solid #ffdbad;
        }

        .cell.black {
            background-color: #d18b47;
            border: 2px solid #c37405;
        }

        #board_el>.cell {}

        .vertical .cell,
        .horizontal .cell {
            font-size: 32px;
        }

        .horizontal {
            display: flex;
            flex-direction: row;
            padding-left: 66px
        }
    </style>

</head>

<body>
    <div style="display:flex; flex-direction:column">
        <div style="display:flex; flex-direction:row;position:relative">
            <div class="vertical">
                <div class="cell">8</div>
                <div class="cell">7</div>
                <div class="cell">6</div>
                <div class="cell">5</div>
                <div class="cell">4</div>
                <div class="cell">3</div>
                <div class="cell">2</div>
                <div class="cell">1</div>
            </div>
            <div id="board_el"></div>
            <!--<div id="board_overlay"></div>-->
        </div>
        <div class="horizontal">
            <div class="cell">A</div>
            <div class="cell">B</div>
            <div class="cell">C</div>
            <div class="cell">D</div>
            <div class="cell">E</div>
            <div class="cell">F</div>
            <div class="cell">G</div>
            <div class="cell">H</div>
        </div>
    </div>

    <script type="module">
        import {
            Sprites
        } from '/assets/figures.js'
        import {
            Board
        } from '/assets/board.js'

        /*console.log(Sprites)

        function drawBoard() {
            board.innerHTML = ''
            for (var i = 0; i < 64; i++) {
                const cell = document.createElement('div')
                cell.onclick = function() {
                    //if (cell.style.backgroundColor == 'red') {
                    //    cell.style.backgroundColor = ''
                    //} else {
                    //    cell.style.backgroundColor = 'red'
                    //}
                }

                const x = Math.floor(i / 8)
                const y = i % 8

                cell.className = 'cell ' + ((x % 2 == y % 2) ? 'white' : 'black')
                board.append(cell)
            }
        }

        function fillStartingPositions() {
            const template = ['rook', 'horse', 'bishop', 'queen', 'king', 'bishop', 'horse', 'rook'];

            // Заполняю 
            for (var i = 0; i < 8; i++) {
                board.childNodes[1 * 8 + i].innerHTML = Sprites.white.pawn //WhiteFigures.pawn
                board.childNodes[6 * 8 + i].innerHTML = Sprites.black.pawn //BlackFigures.pawn

                board.childNodes[i].innerHTML = Sprites.white[template[i]]
                board.childNodes[7 * 8 + i].innerHTML = Sprites.black[template[i]]
            }
        }

        function getCell(x, y) {
            return board.childNodes[x * 8 + y]
        }

        drawBoard()
        fillStartingPositions()*/

        const board = new Board
        board.fillStartingPositions()
        board.draw(document.getElementById('board_el'))
    </script>
</body>

</html>