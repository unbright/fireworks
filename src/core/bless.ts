import { getUrlParam } from "./tools"

export default class Bless {

    private static index: number = 0
    private static animationClass = 'show'
    private static box: HTMLElement = document.querySelector('#box')
    private static reveal: HTMLElement = document.querySelector('#reveal')
    private static content: HTMLElement = document.querySelector('#content')

    public static begin(contents: { k: string, d?: string }[]) {
        const duration = Number(getUrlParam('d')) || 9000
        this.show(contents, duration)
        setInterval(() => {
            this.show(contents, duration)
        }, duration)
    }

    private static show(contents: { k: string, d?: string }[], duration: number) {
        this.reveal.classList.remove(this.animationClass)
        this.content.textContent = contents[this.index].k
        this.box.classList.remove('fade')
        setTimeout(() => {
            this.reveal.classList.add(this.animationClass)
            if (this.index < contents.length - 1) {
                this.index++
            } else {
                this.index = 0
            }
        }, 200);
        setTimeout(() => {
            this.box.classList.add('fade')
        }, duration - 1000);
    }
}