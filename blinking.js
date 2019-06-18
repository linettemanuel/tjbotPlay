let tjbot = document.querySelector(".tjbot-pic");
let __path = "./image/basic/tjbot/"
let changeBlink;
let randNumbers = [1, 2];
let num;
let j;

function eyeBlink() {
    openEyes();
}

function openEyes() {
    tjbot.src = __path + "default.svg";
    closedEyes();
}

function closedEyes() {
    tjbot.src = __path + "default_b.svg";
    setTimeout(() => { 
        tjbot.src = __path + "default.svg"; 
    }, 200);
}

setInterval( () => {
    let numIndex = Math.floor(Math.random() * 2);
    num = randNumbers[numIndex];
    for(j = 0; j<num; j++){
        setTimeout(() => { 
            eyeBlink();
        }, 500 * j);
    }
}, 3000);


