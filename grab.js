var i = 5;
let mainEl = document.querySelector(".main-content");
let panelY = document.querySelector(".Y-block-area");
let panelX = document.querySelector(".X-block-area");
let blocksY = Array.from(panelY.children);
const blocksX = Array.from(panelX.children);
let cloner;
let givenEvent;
let block = document.querySelector("#block1");
let checkPosition;
let setEventShineTurn = 0;
let musicPlayTurn = 0;
const numbers = ["first", "second", "third", "fourth", "fifth", "sixth"]
let runEvents = ["empty", "empty", "empty", "empty", "empty", "empty"];

function setEvent(evntNum ,posNum){
    switch(evntNum) {
        case 0:
          givenEvent = `shine(${eventColors[setEventShineTurn]})`;
          runEvents[posNum] = givenEvent;
          setEventShineTurn++;
          break;
        case 1:
          givenEvent = `converse()`;
          runEvents[posNum] = givenEvent;
          break;
        case 2:
          givenEvent = `talk()`;
          runEvents[posNum] = givenEvent;
          break;
        case 3:
          givenEvent = `see()`;
          runEvents[posNum] = givenEvent;
          break;
        case 4:
          givenEvent = `wave()`;
          runEvents[posNum] = givenEvent;
          break;
        case 5:
          givenEvent = `sing(${chosenSongs[musicPlayTurn]})`;
          runEvents[posNum] = givenEvent;
          musicPlayTurn++;
          break; 
        default:
            console.log("Oops, something is not right");
      }
      console.log(runEvents);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

function drop(ev, x) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let futureEl = document.querySelector(`#${data}`);
    blocksY = Array.from(panelY.children);
    let num = blocksY.indexOf(futureEl);
    createNewOriginal(futureEl, num);
    let current  = ev.target;
    if(futureEl.classList.contains("last") && num == 5) {
        futureEl.classList.remove("last");
        if(x < (blocksX.length - 1)){
            futureEl.classList.add("added");
            panelX.replaceChild(futureEl, current);
        } else {
            panelX.replaceChild(futureEl, current);
        }
    } else if(futureEl.classList.contains("last") == false && x == (blocksX.length - 1)) {
        futureEl.classList.remove("added");
        futureEl.classList.add("last");
        panelX.replaceChild(futureEl, current);
    } else {
        panelX.replaceChild(futureEl, current);
    }
    setEvent(num ,x);
    /*
    if(futureEl.classList.contains("last") && num == 5){
        panelX.replaceChild(futureEl, current);
    } else if (futureEl.classList.contains("last") && num < 5) {
        futureEl.classList.remove("last");
        panelX.replaceChild(futureEl, current);
    } else if (futureEl.classList.contains("last") == false && num == 5) {
        futureEl.classList.add("last");
        panelX.replaceChild(futureEl, current);
    }
    */
    //ev.target.appendChild(document.getElementById(data));
}

function createNewOriginal(original, num) {
    if (panelY.children.length < 7){
        if(num == 0) {
            counter++;
            showOrHide(counter);
            console.log(shineIn)
            eventColors.push(shineIn);
        } else if(num == 5) {
            chosenMusic = music;
            chosenSongs.push(chosenMusic);
        }
        let clone = original.cloneNode(true); // "deep" clone
        i += 1;
        clone.id = "block" + i; // there can only be one element with an ID
        clone.ondragstart = (e) => {
            drag(e);
        }; 
        clone.onclick = () => {
            if (num == 0) {
                showOrHide(counter);
            } else if (num == 2){
                showOrHideTalk(counterTalk);
            } else if (num == 4) {
                wave();
            } else if (num == 5) {
                play();
            }
        }
        clone.draggable = true;
        if (num < 5) {
            clone.className = `block added ${numbers[num]}`;
        } else {
            clone.className = `block last ${numbers[num]}`;
        }
        panelY.insertBefore(clone, panelY.children[num]);
    }
}

blocksY.forEach( (block,index) => {
    block.ondragstart = (e) => {
        drag(e);
    }
})

blocksX.forEach( (block, index) => {
    block.ondrop = (e) => {
        drop(e, index);
    }

    block.ondragover = (e) => {
        allowDrop(e);
    }

    block.ondragenter = (e) => {
        e.target.style.border = "3px dashed #48A5C1";
    }


    block.ondragleave = (e) => {
        e.target.style.border = "3px dashed #E3E3E3";
    }
})


