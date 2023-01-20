import Canvas from "./canvas"
import Fire from "./fire";
import Point from "./point"
import TextFire from "./text-fire";
import { clearRafInterval, getUrlParam, randomHsla, randomNum, setRafInterval } from "./tools"

declare interface Config {
    total: number;
    fireCount: number;
    text: string[]
}

export default class Fireworks {

    private timer: { id: number | NodeJS.Timer }
    private count = 0
    private points: Point[] = []
    private fires: Fire[] = []
    private textFires: TextFire[] = []
    private rate: number = Number(getUrlParam('f')) || 750

    constructor(private config?: Config) {
        const { width, height } = Canvas.getCtx()
        const appends: string = getUrlParam('c')
        if (appends && appends !== '') {
            this.config.text = [...appends.split(','), ...this.config.text]
        }
        this.timer = setRafInterval(() => {
            if (this.config.total == this.count) {
                clearRafInterval(this.timer)
                this.timer = null
                this.count = 0
            } else {
                this.count++
                const point = new Point({
                    radius: randomNum(4, 6),
                    x: randomNum(width * 1 / 10, width * 9 / 10),
                    y: height,
                    gravity: 0.1,
                    speedX: Math.random() * 2 - 1,
                    speedY: -Math.random() * 2 - randomNum(8, 11),
                });
                point.end = () => {
                    if (point.speedY > 1) {
                        this.points.splice(this.points.indexOf(point), 1)
                        this.createFires(point)
                        this.showTextFire(point)
                    }
                }
                this.points.push(point)
            }
        }, this.rate)
    }

    private showTextFire(point: Point) {
        const i = randomNum(0, 2)
        if (i % 2 === 0) {
            const index = randomNum(0, this.config.text.length - 1)
            const arr = this.createText(this.config.text[index])
            this.createTextFires(point, arr)
        }
    }

    private createTextFires(point: Point, textArr1: { x, y, w, h: number }[]) {
        textArr1.forEach(item => {
            const power = 0.05;
            const speedX = (item.x - item.w / 2) * power
            const speedY = (item.y - item.h / 2) * power
            const { brightness, alpha } = randomHsla()
            const fire = new TextFire({
                x: point.x,
                y: point.y,
                radius: Math.floor(Math.random() * 2) + 1,
                speedX,
                speedY,
                gravity: 0.03,
                hues: point.hues,
                brightness,
                alpha
            })
            fire.end = () => {
                if (fire.life < 10) {
                    this.textFires.splice(this.textFires.indexOf(fire), 1)
                }
            }
            this.textFires.push(fire)
        })
    }

    private createFires(point: Point) {
        const size = randomNum(8, 15)
        for (let i = 0; i < this.config.fireCount; i++) {
            this.fires.push(this.createFire(point, i, size))
        }
    }


    private createFire(point: Point, i: number, size: number): Fire {
        const seed = Math.random() * size
        const speedX = Math.cos(i * 6 * Math.PI / 180) * seed
        const speedY = Math.sin(i * 6 * Math.PI / 180) * seed
        const { hues } = point
        const { brightness, alpha } = randomHsla()
        const fire = new Fire({
            radius: Math.random() * 3 + 2,
            x: point.x,
            y: point.y,
            speedX,
            speedY,
            gravity: 0.05,
            hues, brightness, alpha
        })
        fire.end = () => {
            if (fire.life < 10) {
                this.fires.splice(this.fires.indexOf(fire), 1)
            }
        }
        return fire
    }

    public createText(text: string, level: number = 4): { x: number, y: number, w: number, h: number }[] {
        const { textCtx, textWidth, textHeight } = Canvas.getTextCtx()
        const fontSize = 120;

        textCtx.font = fontSize + "px Verdana";
        textCtx.fillStyle = "#ffffff";

        const tWidth = textCtx.measureText(text).width;
        const tHeight = fontSize;
        textCtx.fillText(text, 0, tHeight);
        const imgData = textCtx.getImageData(0, 0, tWidth, tHeight * 1.2);

        textCtx.fillStyle = "#000000";
        textCtx.fillRect(0, 0, textWidth, textHeight);

        const x = Math.floor(imgData.width / level)
        const y = Math.floor(imgData.height / level)
        const texts = []
        for (let h = 0; h < y; h++) {
            for (let w = 0; w < x; w++) {
                const { r, g, b, a } = this.getParticleArray(imgData, w * level, h * level)
                if (r + g + b == 0) {
                    continue;
                };
                texts.push({ x: w * level, y: h * level, w: imgData.width, h: imgData.height })
            }
        }
        return texts
    }

    private getParticleArray(imageData: ImageData, x: number, y: number) {
        const width = imageData.width
        const data = imageData.data
        const r = data[(y * width + x) * 4]
        const g = data[(y * width + x) * 4 + 1]
        const b = data[(y * width + x) * 4 + 2]
        const a = data[(y * width + x) * 4 + 3]
        return { r, g, b, a }
    }


    public start = () => {
        this.render()
        requestAnimationFrame(this.start)
    }

    private render() {
        const { ctx, width, height } = Canvas.getCtx()
        ctx.globalCompositeOperation = 'destination-out';
        if (this.points.length) {
            ctx.fillStyle = 'rgba(0,0,0,' + 0.25 + ')';
            ctx.fillRect(0, 0, width, height)
        } else {
            ctx.fillStyle = 'rgba(0, 0, 0)'
            ctx.fillRect(0, 0, width, height)
        }
        // Canvas.clear()
        ctx.globalCompositeOperation = 'lighter';
        this.points.forEach(item => {
            item.draw()
        })
        this.fires.forEach(item => {
            item.draw()
        })
        this.textFires.forEach(item => {
            item.draw()
        })
    }
}