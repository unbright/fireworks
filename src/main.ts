import './main.css';
import Canvas from './core/canvas'
import Fireworks from './core/fireworks';
import Music from './core/music';
import Bless from './core/bless';

main();

function main() {
    Music.ready([
        'https://unbright.tk:9001/msc/4.mp3',
        'https://unbright.tk:9001/msc/1.mp3',
        'https://unbright.tk:9001/msc/2.mp3',
        'https://unbright.tk:9001/msc/3.mp3',
        'https://unbright.tk:9001/msc/5.mp3',
        'https://unbright.tk:9001/msc/6.mp3',
        'https://unbright.tk:9001/msc/7.mp3',
        'https://unbright.tk:9001/msc/8.mp3',
        'https://unbright.tk:9001/msc/9.mp3',
    ])
    Bless.begin([
        { k: '愿你所有快乐无需假装，愿你此生尽头赤诚善良，愿你成为自己的太阳，无需借助谁的光芒。' },
        { k: '愿你的未来纯净明朗，像你此刻的可爱目光，在世间美好的命运中，愿你的命运美好欢畅。', d: '普希金' },
        { k: '希望你，像山风，像阳光，像滚烫的手掌，可予人所要；也不惧，来路风雨。' },
        { k: '愿你有高跟鞋也有跑鞋，喝茶也喝酒，愿你有勇敢的朋友，有牛逼的对手，愿你对过往的一切情深意重，但从不回头，愿你特别美丽，特别平静，特别勇敢，也特别温柔。' },
        { k: '笙歌间错华筵启。喜新春新岁。菜传纤手青丝细。和气入、东风里。幡儿胜儿都姑媂。戴得更忔戏。愿新春已后，吉吉利利。百事都如意。', d: '赵长卿' },
        { k: '春有百花秋有月，夏有凉风冬有雪。莫将闲事挂心头，便是人间好时节。', d: '无门慧开禅师' },
        { k: '手掬星辰，口衔柔波。用一首清诗，两袖词赋，三章五文，敬你年少写意傥风流。世故几载，大口吃愁，快意飞马。侠气纵横，缘来不拒，情走不留。' },
        { k: '纵有千古，横有八荒。前途似海，来日方长。凡心所向，素履以往，生如逆旅，一苇以航。', d: '梁启超，七堇年：尘曲' },
        { k: '美好的，留在心底；遗憾的，随风散去。活在当下，且行且珍惜。' },
        { k: '我用所有的喜悦，为你祈祷，愿你在这新的一年里平安、快乐。' }
    ])
    Canvas.init()
    new Fireworks({
        total: 1000,
        fireCount: 500,
        text: ['贾媛', '新年快乐', '贾媛', '永远', '开心', '美丽', '贾媛', '鹏程万里', '永远',
            '万喜万般宜', '如花似叶', '永沐春风', '一帆风顺', '安心', '成功', '平安', '豫立亨通']
    }).start()
}