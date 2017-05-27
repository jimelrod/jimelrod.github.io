let kickSound = document.getElementById("kick");
let kickTrigger = document.getElementById("kick-trigger");
kickTrigger.onclick = (ele, e) => {
    //console.log("Boom", (new Date()));

    if (kickSound.paused) {
        kickSound.play();
    }
    else {
        kickSound.currentTime = 0;
    }
    
};