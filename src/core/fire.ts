import Canvas from "./canvas";
import Draw from "./draw";

export default class Fire extends Draw {

    private fs = 0.95
    life = 100

    constructor(config: Partial<Fire>) {
        super(config)
    }

    change(): void {
        this.x += this.speedX
        this.y += this.speedY
        this.speedY += this.gravity
        this.speedX *= this.fs
        this.speedY *= this.fs
        if (this.life > 0 && this.life < 300) {
            this.life--
        }
        this.alpha -= 0.006
    }
    render(): void {
        const { ctx } = Canvas.getCtx()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * Math.min(this.life, 100) / 100, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'hsla(' + this.hues + ',100%,' + this.brightness + '%,' + this.alpha + ')'
        ctx.fill();
        this?.end()
    }

}