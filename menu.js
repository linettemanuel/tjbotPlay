let optionMenu = document.querySelector(".menu-area");
let talktMenu = document.querySelector(".talk-area");
let optionMenuColors = document.querySelector(".brick-area");
let cameraWindow = document.querySelector("#myOnlineCamera");
let dotsArea = document.querySelector(".listening-text");
let cameraState = false;
let colors = Array.from(optionMenuColors.children);
let colorDot;
let shineIn = "random";
let led = document.querySelector(".led");
let counter = 0;
let counterTalk = 0;
let counterSee = 0;
let counterConverse = 0;
let converseState = true;
let eventColors = [];
let tjbotFull = document.querySelector(".complete-tj");
const tj = new Tjbot("Michael", "male");

function showOrHide(num){
    if (num % 2) {
        optionMenu.style.height = "0vh";
        optionMenu.style.transition = "1s all ease";
        optionMenu.style.opacity = "0";
        optionMenu.style.zIndex = "-10";
        counter++;
    } else {
        optionMenu.style.height = "70vh";
        optionMenu.style.transition = "1s all ease";
        optionMenu.style.opacity = "1";
        optionMenu.style.zIndex = "10";
        counter++;
    }
}

function showOrHideTalk(num){
    if (num % 2) {
        talktMenu.style.transition = "1s all ease";
        talktMenu.style.opacity = "0";
        talktMenu.style.zIndex = "-10";
        counterTalk++;
    } else {
        talktMenu.style.transition = "1s all ease";
        talktMenu.style.opacity = "1";
        talktMenu.style.zIndex = "10";
        counterTalk++;
    }
}

function showOrHideSee(num) {
    console.log("Show " + cameraState);
    if ((num % 2) && (cameraState)) {
        clearAll(myOnlineCamera, temp, canvas, context, canvas.offsetWidth, canvas.offsetHeight);
        cameraWindow.style.transition = "1s all ease";
        cameraWindow.style.opacity = "0";
        cameraWindow.style.zIndex = "-10";
        counterSee++;
        cameraState = false;
    } else {
        cameraWindow.style.transition = "1s all ease";
        cameraWindow.style.opacity = "1";
        cameraWindow.style.zIndex = "10";
        counterSee++;
    }
}

function showOrHideConverse(num) {
    if (num % 2) {
        dotsArea.style.transition = "1s all ease";
        dotsArea.style.opacity = "0";
        dotsArea.style.zIndex = "-10";
        counterConverse++;
        converseState = true;
    } else {
        dotsArea.style.transition = "1s all ease";
        dotsArea.style.opacity = "1";
        dotsArea.style.zIndex = "10";
        counterConverse++;
        converseState = false;
        completed = true;
    }
}

blocksY.forEach( (block, index) => {
    block.onclick = () => {
        if (index == 0) {
            showOrHide(counter);
        } else if (index == 1) {
            tj.converse(tjbotFull);
        } else if (index == 2){
            showOrHideTalk(counterTalk);
        } else if (index == 3) {
            if ((counterSee % 2 == false) && (cameraState == false)) {
                tj.see();
            }
            showOrHideSee(counterSee);
        } else if (index == 4) {
            tj.wave();
        } else if (index == 5) {
            tj.play();
        }
    }
})

colors.forEach( color => {
    color.onclick = (e) => {
        tj.shineWithDot(e.target.title);
    }
})


