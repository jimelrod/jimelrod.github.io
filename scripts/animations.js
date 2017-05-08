EODG.pulseColor = (ele, colors) => {
    let frames = [],
        options = {
            duration: 5000,
            iterations: Infinity
        };

    colors.forEach(color => {
        frames.push({
            fill: color
        });
    });
    
    ele.animate(frames, options);
};

document
    .querySelectorAll('.yellow')
    .forEach(ele => EODG.pulseColor(ele, ["#ffff00", "#ff00ff", "#00ffff", "#ffff00"]));

document
    .querySelectorAll('.magenta')
    .forEach(ele => EODG.pulseColor(ele, ["#ff00ff", "#00ffff", "#ffff00", "#ff00ff"]));

document
    .querySelectorAll('.cyan')
    .forEach(ele => EODG.pulseColor(ele, ["#00ffff", "#ffff00", "#ff00ff", "#00ffff"]));

document
    .querySelectorAll('.black')
    .forEach(ele => EODG.pulseColor(ele, ["#000000", "#cccccc", "#000000"]));

document.body.animate([
    {
        backgroundColor: "#ffff00"
    },
    {
        backgroundColor: "#ff00ff"
    },
    {
        backgroundColor: "#00ffff"
    },
    {
        backgroundColor: "#000000"
    },
    {
        backgroundColor: "#ffffff"
    },
    {
        backgroundColor: "#ffff00"
    }
], {
    duration: 20000,
    iterations: Infinity
});