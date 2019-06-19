let videoObj    = { "video": true },
    errBack        = function(error) {
        alert("Video capture error: ", error.code);
    };
let temp;
let context;
let myOnlineCamera = document.querySelector('#myOnlineCamera'),
    video = myOnlineCamera.querySelector('.video'),
    canvas = myOnlineCamera.querySelector('.canvas');
    button = myOnlineCamera.querySelector('.takephoto');

function clearAll(y, z, a, b, w, h) {
    b.clearRect(0, 0, w, h);
    y.replaceChild(a, z);
}
function hidepanel(x) {
    x.pause();
    x.srcObject = null;
}

function stopStream(stream){
    stream.getTracks().forEach( track => {
        track.stop()
    });
}

function startWebcam(stream) {
        video.width = video.offsetWidth;
        if (navigator.getUserMedia) {                    // Standard
            console.log("standard");
            video.srcObject = stream;
            video.play();
        } else if (navigator.webkitGetUserMedia) {        // WebKit
            console.log("webkit");
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        } else if (navigator.mozGetUserMedia) {        // Firefox
            console.log("firefox");
            video.src = window.URL.createObjectURL(stream);
            video.play();
        };
    
        // Click to take the photo
        button.onclick = () => {
            tj.play("take_a_picture");
            // Copying the image in a temporary canvas
            temp = document.createElement('canvas');
            temp.width  = video.offsetWidth;
            temp.height = video.offsetHeight;

            let tempcontext = temp.getContext("2d"),
            tempScale = (temp.height / temp.width);

            tempcontext.drawImage(
                video,
                0, 0,
                video.offsetWidth, video.offsetHeight
            );

            // Resize it to the size of our canvas
            canvas.width = canvas.offsetWidth;
            canvas.height = parseInt( canvas.offsetHeight * tempScale );
            context = canvas.getContext("2d"),
                scale = canvas.width / temp.width;
            context.scale(scale, scale);
            context.drawImage(canvas, 0, 0);
            myOnlineCamera.replaceChild(temp, canvas);
            stopStream(stream);
            hidepanel(video);
            setTimeout(() => {
                completed = true;
                showOrHideSee(counterSee);
            }, 1500)
        };
};