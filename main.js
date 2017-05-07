function pulseColor(ele, colors) {
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
}

document
    .querySelectorAll('.yellow')
    .forEach(ele => pulseColor(ele, ["#ffff00", "#ff00ff", "#00ffff", "#ffff00"]));

document
    .querySelectorAll('.magenta')
    .forEach(ele => pulseColor(ele, ["#ff00ff", "#00ffff", "#ffff00", "#ff00ff"]));

document
    .querySelectorAll('.cyan')
    .forEach(ele => pulseColor(ele, ["#00ffff", "#ffff00", "#ff00ff", "#00ffff"]));
