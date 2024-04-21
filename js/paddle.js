const SPEED = 0.02

export default class Paddle {
    constructor(paddle) {
        this.paddleElem = paddle
        this.reset()
    }

    get top() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--top"))
    }

    set top(value) {
        this.paddleElem.style.setProperty("--top", value)
    }

    rect() {
        return this.paddleElem.getBoundingClientRect()
    }

    reset() {
        this.top = 50
    }

    update(delta, ballHeight) {
        this.top += SPEED * delta * (ballHeight - this.top)
    }
}