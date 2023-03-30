<?php
/*$svgs = scandir('./assets');

    mkdir('./assets1');

    $figures = ['r', 'n', 'b', 'q', 'k', 'p'];
    $figures = ['rook', 'horse', 'bishop', 'queen', 'king', 'pawn'];
    foreach($svgs as $svg) {
        if($svg == '.' || $svg == '..') {
            continue;
        }

        $d = file_get_contents('./assets/'.$svg);
    
        $name = str_replace(['Chess_', '45.svg'], '', $svg);
        echo $name."\n";
    }

    exit;*/
?>
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

        #board {
            border-collapse: collapse;

            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;

            border: 2px solid #c9c9c9;
        }

        #board>div,
        .cell {
            width: 64px;
            height: 64px;
            font-size: 64px;
            line-height: 64px;
            text-align: center;
        }

        #board>div>img {
            width: 100%;
            height: 100%;
        }

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
        <div style="display:flex; flex-direction:row;">
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
            <div id="board"></div>
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


    <script type="text/javascript">
        //const figuresTemplate = ['rook', 'horse', 'bishop', 'queen', 'king', 'bishop', 'horse', 'rook'];
        const WhiteFigures = {
            rook: '♖',
            horse: '♘',
            bishop: '♗',
            queen: '♕',
            king: '♔',
            pawn: '♙',
        }

        const BlackFigures = {
            rook: '♜',
            horse: '♞',
            bishop: '♝',
            queen: '♛',
            king: '♚',
            pawn: '♟',
        }

        function drawBoard() {
            board.innerHTML = ''
            for (var i = 0; i < 64; i++) {
                const cell = document.createElement('div')
                cell.className = 'cell'

                const x = Math.floor(i / 8)
                const y = i % 8

                if (x % 2 == y % 2) {
                    cell.style.backgroundColor = '#ffce9e'
                    cell.style.border = '2px solid #ffdbad'
                } else {
                    cell.style.backgroundColor = '#d18b47'
                    cell.style.border = '2px solid #c37405'
                }

                board.append(cell)
            }
        }

        function fillStartingPositions() {
            const template = ['rook', 'horse', 'bishop', 'queen', 'king', 'bishop', 'horse', 'rook'];

            // Заполняю 
            for (var i = 0; i < 8; i++) {

                board.childNodes[1 * 8 + i].innerHTML = WhiteFigures.pawn
                board.childNodes[6 * 8 + i].innerHTML = BlackFigures.pawn

                //board.childNodes[i].innerHTML = `♗`
                board.childNodes[i].innerHTML = WhiteFigures[template[i]] //`<img src="/assets/Chess_${figuresTemplate[i]}dt45.svg"/>`
                board.childNodes[7 * 8 + i].innerHTML = BlackFigures[template[i]] //`<img src="/assets/Chess_${figuresTemplate[i]}lt45.svg"/>`
            }
        }

        function getCell(x, y) {
            return board.childNodes[x * 8 + y]
        }

        drawBoard()
        fillStartingPositions()

        //getCell(3, 4).style.backgroundColor = 'red'
    </script>
</body>

</html>