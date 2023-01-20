export default class Canvas {

    private static ctx: CanvasRenderingContext2D = null;
    private static textCtx: CanvasRenderingContext2D = null;
    private static width: number;
    private static height: number;
    private static textWidth: number;
    private static textHeight: number;

    public static init() {
        const canvas: HTMLCanvasElement = document.querySelector('#fireworks')
        this.ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        this.width = canvas.width
        this.height = canvas.height
        this.initText()
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            this.width = canvas.width
            this.height = canvas.height
            this.clear()
        })
    }

    public static clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    private static initText() {
        const textCanvas: HTMLCanvasElement = document.createElement('canvas');
        textCanvas.width = 1000;
        textCanvas.height = 300;
        this.textWidth = textCanvas.width
        this.textHeight = textCanvas.height
        this.textCtx = textCanvas.getContext('2d', { willReadFrequently: true });
        this.textCtx.fillStyle = '#000000';
        this.textCtx.fillRect(0, 0, textCanvas.width, textCanvas.height);
    }

    public static getCtx() {
        if (!this.ctx) {
            throw new Error('must create canvas object')
        }
        return { ctx: this.ctx, width: this.width, height: this.height }
    }

    public static getTextCtx() {
        if (!this.textCtx) {
            throw new Error('must create canvas object')
        }
        return { textCtx: this.textCtx, textWidth: this.textWidth, textHeight: this.textHeight }
    }
}