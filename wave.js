let tjHand = document.querySelector(".tjbot-hand");


function wave() {
    handUp();
}

function handUp() {
    tjHand.src = __path + "wave/up.svg";
    handDown();
}

function handDown() {
    tjHand.src = __path + "wave/down.svg";
    setTimeout(() => { 
        tjHand.src = __path + "wave/up.svg"; 
    }, 200);
}