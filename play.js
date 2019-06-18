const randomSongs = ["lose", "win"];
const __path_music_ = "./music/";
let y = 0;
let music = "random";
let chosenMusic = "random";
let chosenSongs = [];

function play(song) {
    console.log(song);
    if ((chosenMusic.includes("random")) || (typeof song === "undefined")) {
        y = Math.floor(Math.random() * 2);
        music = randomSongs[y];
        let audio = new Audio(__path_music_ + music + ".mp3");
        audio.play();
    } else if (song) {
        let audio = new Audio(__path_music_ + song + ".mp3");
        audio.play();
    } else {
        let audio = new Audio(__path_music_ + chosenMusic + ".mp3");
        audio.play();
    }
}