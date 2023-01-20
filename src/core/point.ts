import Canvas from "./canvas";
import Draw from "./draw";
import { randomHsla } from "./tools";


export default class Point extends Draw {

    constructor(config: Partial<Point>) {
        super(config)
        const { hues, brightness, alpha } = randomHsla()
        this.hues = hues
        this.brightness = brightness
        this.alpha = alpha
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.speedY += this.gravity
    }

    change(): void {
        this.x += this.speedX
        this.y += this.speedY
        this.speedY += this.gravity
    }

    render(): void {
        const { ctx } = Canvas.getCtx()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'hsla(' + this.hues + ',100%,' + this.brightness + '%,' + this.alpha + ')';
        ctx.fill();
        this?.end()
    }
}