import colorSpecs from './color-specs.json';

export class MainAnimations {
    constructor() {
        this.colorSpecs = colorSpecs;
    }

    pulseColor(ele, colors, styleTarget, duration) {
        
        let defaultStyleTarget = "fill";
        let defaultDuration = 5000;

        styleTarget = styleTarget || defaultStyleTarget;
        duration = duration || defaultDuration;
        
        let frames = [],
            options = {
                duration: 5000,
                iterations: Infinity
            };

        colors.forEach(color => {
            let style = {};
            
            style[styleTarget] = color;

            frames.push(style);
        });

        ele.animate(frames, options);
    }

    start() {
        this.colorSpecs.forEach(colorSpec => {
            document
                .querySelectorAll(colorSpec.selector)
                .forEach(ele => this.pulseColor(ele, colorSpec.colors, colorSpec.styleTarget, colorSpec.duration));
        });
    }
}