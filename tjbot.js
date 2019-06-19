class Tjbot {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }

    shine(color) {
        led.style.fill = color;
        led.style.stroke = color;
        led.style.animation = "ledPulse 1s infinite alternate";
        shineIn = color;
        completed = true;
    }

    shineWithDot(color){
        colorDot = panelY.querySelector(".color");
        colorDot.style.backgroundColor = color;
        this.shine(color);
    }

    converse(who) {
        showOrHideConverse(counterConverse);
        if(converseState) {
            console.log("converse " + converseState);
            who.style.borderRadius = "20%";
            who.style.padding = "1.75rem 1.5rem 1.75rem 0rem";
            //tjbotFull.style.animation = "tjPulse 1s infinite alternate";
            who.style.transform = "translate(0%, -6.65%)";
        }
    }

    talk() {
        document.querySelector(".talk-msg").value = "";
        document.querySelector(".message-window").style.transition = "1s all ease";
        document.querySelector(".message-window").style.opacity = "1";
        document.querySelector(".message-window").style.zIndex = "10";
        setTimeout(() => {
            document.querySelector(".message-window").style.transition = "1s all ease";
            document.querySelector(".message-window").style.opacity = "0";
            document.querySelector(".message-window").style.zIndex = "-10"; 
            messageSend = false;  
            completed = true;
        }, 3000)
    }

    wave() {
        handUp();
        completed = true;
    }

    see() {
        cameraState = true;
        // Ask the browser for permission to use the Webcam
        if (navigator.getUserMedia) {                    // Standard
            navigator.getUserMedia(videoObj, startWebcam, errBack);
        } else if (navigator.webkitGetUserMedia) {        // WebKit
            navigator.webkitGetUserMedia(videoObj, startWebcam, errBack);
        } else if (navigator.mozGetUserMedia) {        // Firefox
            navigator.mozGetUserMedia(videoObj, startWebcam, errBack);
        }
    }

    play(song) {
        songStatus = "on";
        let audio;
        console.log(song);
        if (typeof song === "undefined") {
            y = Math.floor(Math.random() * randomSongs.length);
            music = randomSongs[y];
            audio = new Audio(__path_music_ + music + ".mp3");
            audio.id = "audio";
            audio.play();
        } else if (song) {
            audio = new Audio(__path_music_ + song + ".mp3");
            audio.play();
            audio.id = "audio";
        } else {
            audio = new Audio(__path_music_ + chosenMusic + ".mp3");
            audio.play();
            audio.id = "audio";
        }
        audio.onended = () => {
            songStatus = "off";
            completed = true;
        }
    }

}
