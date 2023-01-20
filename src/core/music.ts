import { getUrlParam } from "./tools"

export default class Music {

    private static index: number = Number(getUrlParam('t')) || 0
    private static audio: HTMLAudioElement = document.querySelector('#audio')
    private static music: HTMLElement = document.querySelector('.music')

    public static ready(urls: string[]) {
        this.audio.src = urls[this.index]
        this.audio.volume = 0.2
        this.audio.load()
        window.addEventListener('click', () => {
            this.play()
        })
        this.audio.addEventListener('click', () => {
            this.play()
        })
        this.audio.onended = () => {
            if (this.index >= urls.length - 1) {
                this.index = 0
            } else {
                this.index++
            }
            this.audio.src = urls[this.index]
            this.audio.load()
            this.audio.play()
        }
    }

    private static play() {
        if (this.audio.paused) {
            this.music.classList.add('run')
            this.audio.play()
        } else {
            this.music.classList.remove('run')
            this.audio.pause()
        }
    }

}