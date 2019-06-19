let runButton = document.querySelector(".run-button-area");
let ran = 0;
let taskDone;
let vyhodnoceni;
let completed;
let songStatus = "off";
let messageSend = false;
let fired;
let currentBlock;

document.querySelector(".send").onclick = () => {
    console.log(messageSend);
    messageSend = true;
    console.log(messageSend);
    document.querySelector(".tj-text").innerHTML = document.querySelector(".talk-msg").value;
    tj.talk();
    showOrHideTalk(counterTalk);
}

function getColor() {
    let passedColor = window.getComputedStyle( currentBlock.children[0],null).getPropertyValue('background-color');
    if (passedColor == "rgba(0, 0, 0, 0)") {
        passedColor = ledColors[(Math.floor(Math.random() * 6))];
    }
    console.log(passedColor);
    return passedColor
}

function processLed(ledColor) {
    let zpracujLed = new Promise((res, rej) => {
        if (ledColor) {
            res(ledColor)
        } else {
            rej(console.log("Something went wrong with shining!"))
        }
    })

    zpracujLed.then((color) => {
         tj.shine(color);
         setTimeout(() => {
            catchIfisDone(completed)
        }, 1500)
    })
    
}

function processConverse(something) {
    let zpracujConverse = new Promise((res, rej) => {
        if (converseState) {
            res(something)
        } else {
            rej(console.log("Something went wrong with conversation!"))
        }
    })

    zpracujConverse.then((obj) => {
        tj.converse(obj);
        setTimeout(() => {
           catchIfisDone(completed);
           showOrHideConverse(counterConverse);
       }, 3000)
   })
}

function processTalk() {
    if(!messageSend) {
        window.setTimeout(processTalk.bind(null), 100);
    } else {
        setTimeout(() => {
            catchIfisDone(completed);
        }, 3000)
    }
}

function processWave() {
    tj.wave();
    setTimeout(() => {
        catchIfisDone(completed);
    }, 1000)
}

function processSing(){
    if (songStatus == "on") {
        window.setTimeout(processSing.bind(null), 100);
    } else {
        setTimeout(() => {
            catchIfisDone(completed);
        }, 1000)
    }
}

function processSee() {
    if (cameraState) {
        window.setTimeout(processSee.bind(null), 100);
    } else {
        setTimeout(() => {
            catchIfisDone(completed);
        }, 500)
    }
}




function decideEvent(name) {
    if(name.includes("shine")){    
        console.log(name);
        processLed(getColor());
    } else if(name.includes("converse")){
        console.log("converse")
        console.log(tjbotFull);
        processConverse(tjbotFull);
    } else if(name.includes("talk")){
        console.log("talk")
        showOrHideTalk(counterTalk);
        processTalk();
    } else if(name.includes("see")){
        console.log("see")
        showOrHideSee(counterSee);
        tj.see();
        setTimeout(() => {
            processSee();
        }, 1000);
    } else if(name.includes("wave")){
        console.log("wave")
        processWave();
    } else if(name.includes("sing")){
        console.log("sing")
        tj.play();
        processSing();
    } else if(name.includes("empty")){
        console.log("empty")
        completed = true;
        setTimeout(() => {
            catchIfisDone(completed);
        }, 1000)
    } else {
        console.log("something went wrong");

    }
}

function vymazStylingPredchoziho(cislo){
    let noveCislo = cislo - 1;
    blocksX[noveCislo].style.border = "3px dashed #E3E3E3";
}

function vyznacSoucasnou(soucasnyBlok, num) {
    if ((num > 0) && (num < 6)) {
        vymazStylingPredchoziho(num);
    }
    soucasnyBlok.style.border = "4px dashed rgb(60,60,60)";
}

function catchIfisDone() {
    let jeSplneno = new Promise((res, rej) => {
        if (completed) {
            res(console.log("Block done."))
        } else {
            rej(console.log("Block not done."))
        }
    })

    jeSplneno.then(() => {
        ran++;
        completed = false;
        init();
    })
}


function vyhodnot(soucasnyEvent) {
   decideEvent(soucasnyEvent);
}

function init() {
    if (typeof blocksX === "undefined") {
        alert("This would be a waste of 6 seconds your life,  fill in the panel first and try running it again.");
    } else {
        if (ran < 6) {
            currentBlock = blocksX[ran];
            vyznacSoucasnou(currentBlock, ran);
            vyhodnot(runEvents[ran]);
        } else if (ran == 6) {
            blocksX[(ran - 1)].style.border = "3px dashed #E3E3E3"; 
        }
    }
}


runButton.onclick = () => {
    ran = 0;
    init();
}