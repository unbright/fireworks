export default abstract class Draw {

    hues?: number;
    brightness?: number;
    alpha?: number;
    radius?: number;
    gravity?: number;
    end?: () => void;
    x?: number;
    y?: number;
    speedX?: number;
    speedY?: number;

    constructor(props: Partial<Draw>) {
        Object.assign(this, props)
    }

    abstract change(): void;

    abstract render(): void;

    draw(): void {
        this.change()
        this.render()
    }
}