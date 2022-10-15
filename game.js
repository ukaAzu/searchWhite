const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const text = document.getElementById('text');
const start = document.getElementById('startButton');
const board =
    [
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
        [null, null, null, null, null, null, null, null, null, null,],
    ];
let colorCode = ['#ffffff', '#fefefe', '#fdfdfd', '#fcfcfc', '#fbfbfb', '#fafafa', '#f9f9f9', '#f8f8f8', '#f7f7f7', '#f6f6f6'];
//let colorCode = ['white', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'gray', 'black'];
let x;
let y;

//丸を描く
function drawCircle(x, y, colorCode) {
    ctx.beginPath();
    ctx.fillStyle = colorCode;
    ctx.arc((x + 0.5) * 60, (y + 0.5) * 60, 25, 0, 2 * Math.PI, true);
    ctx.fill();
}

//0~9のランダムな数を作る
function randomNumber() {
    x = Math.floor(Math.random() * 9);
    y = Math.floor(Math.random() * 9);
    return (x, y);
}

//クリックした円の色をチェックする
function checkColor(boardY, boardX) {
    let clickCircleColor = board[boardY][boardX];
    if (clickCircleColor !== null) {
        if (clickCircleColor == colorCode[0]) {
            text.innerText = 'あたり';
            colorCode.splice(0, 1);
        } else {
            text.innerText = 'はずれ';
        }
    } else {
        text.innerText = '円をクリックしてね！';
    }
    console.log(colorCode);
    if (!colorCode.length) {
        text.innerText = '全問正解おめでとう！';
        start.innerText = 'もう一度遊ぶ？';
        start.style.visibility = 'visible';
        start.addEventListener('click', function () {
            location.reload();
        })
    }
}

//ゲームスタート
start.addEventListener('click', function () {
    ctx.clearRect(0, 0, 600, 600);
    start.style.visibility = 'hidden';
    let i = 0;
    while (i < 10) {
        randomNumber();
        if (board[y][x] == null) {
            drawCircle(x, y, colorCode[i]);
            board[y][x] = [colorCode[i]];
            console.log(i + 'つめ ' + x, y, colorCode[i]);
            i++;
        } else {
            console.log('やり直し');
        }
    }
});

//クリックした時
canvas.addEventListener('click', function (event) {
    let rect = event.target.getBoundingClientRect();
    let pointX = event.clientX - rect.left;
    let pointY = event.clientY - rect.top;
    pointX = pointX - pointX % 60;
    pointY = pointY - pointY % 60;
    let boardX = pointX / 60;
    let boardY = pointY / 60;
    console.log('クリックした円の色は' + board[boardY][boardX]);
    checkColor(boardY, boardX);
})
