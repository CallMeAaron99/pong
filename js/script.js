import Ball from "./ball.js"
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
console.log(computerPaddle.rect())

let lastUpdateTime = null

function update(time) {
    if (lastUpdateTime == null) {
        lastUpdateTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastUpdateTime

    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)

    if (isLose()) {
        handelLose()
    }

    lastUpdateTime = time
    window.requestAnimationFrame(update)
}

function handelLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

document.addEventListener("mousemove", e => {
    playerPaddle.top = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)
