let optionMenu = document.querySelector(".menu-area");
let talktMenu = document.querySelector(".talk-area");
let optionMenuColors = document.querySelector(".brick-area");
let colors = Array.from(optionMenuColors.children);
let colorDot;
let shineIn = "random";
let led = document.querySelector(".led");
let counter = 0;
let counterTalk = 0;
let eventColors = [];

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

blocksY.forEach( (block, index) => {
    block.onclick = () => {
        if (index == 0) {
            showOrHide(counter);
        } else if (index == 2){
            showOrHideTalk(counterTalk);
        } else if (index == 4) {
            wave();
        } else if (index == 5) {
            play();
        }
    }
})

colors.forEach( color => {
    color.onclick = (e) => {
        colorDot = panelY.querySelector(".color");
        colorDot.style.backgroundColor = e.target.title;
        led.style.fill = e.target.title;
        led.style.stroke = e.target.title;
        led.style.animation = "ledPulse 1s infinite alternate";
        eventColors.push(e.target.title);
        showOrHide(counter);
        shineIn = e.target.title;
    }
})

document.querySelector(".send").onclick = () => {
    alert("Send: " + document.querySelector(".talk-msg").value);
    showOrHideTalk(counterTalk);
}

