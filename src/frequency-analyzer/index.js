// TODO: Change from a linear freq representation to a logarithmic(sp?)

import {Util} from '../util';

export class FrequencyAnalyzer {
    
    constructor() {

        this.visibleFrequencies = 128;

    }

    // Renders cells for bars of the frequency analyzer
    renderBase() {

        let freqAnalyzerEle = document.querySelector('#freqAnalyzer g');

        for (let i = 0; i < this.visibleFrequencies; i++) {

            let cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            console.log(cell.constructor.name);

            cell.id = `cell${i}`;
            cell.classList.add('cell');

            Util.AddAttributeToElement(cell, 'width', 500 / this.visibleFrequencies);
            Util.AddAttributeToElement(cell, 'x', i * 500 / this.visibleFrequencies);
            Util.AddAttributeToElement(cell, 'y', 1000);

            freqAnalyzerEle.appendChild(cell);
        }
    }

    // This does all the magic with the audio stream... I don't know 
    // what all is really going on here... but it works, so there's that...
    // Thanks MDN
    animate(stream) {
        let visibleFrequencies = this.visibleFrequencies;

        //Audio stops listening in FF without // window.persistAudioStream = stream;
        //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
        //https://support.mozilla.org/en-US/questions/984179
        window.persistAudioStream = stream;

        let audioContent = new AudioContext(),
            audioStream = audioContent.createMediaStreamSource(stream),
            analyser = audioContent.createAnalyser();

        audioStream.connect(analyser);

        analyser.fftSize = 256;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        function doDraw() {
            requestAnimationFrame(doDraw);

            analyser.getByteFrequencyData(dataArray);

            for (let i = 0; i < visibleFrequencies; i++) {
                let ele = document.getElementById(`cell${i}`);
                
                Util.AddAttributeToElement(ele, 'height', dataArray[i] * 2);
                
                ele.style.fillOpacity = dataArray[i]/256;                
            }
        }
        
        doDraw();
    }

    // Asks user for permission to use mic, rocks and rolls if that's cool
    initialize() {
        let constraints = { audio: true };
        
        let successCallback = stream => {
            this.renderBase();
            this.animate(stream);
        };
        
        let errorCallback = err => {
            // Ignore error thrown when user blocks mic access
            if (err.name == "PermissionDeniedError") {
                return;
            }

            // Uhhh... Should probably do something more...
            console.error(err);
        };

        navigator.getUserMedia(constraints, successCallback, errorCallback);
    }

    static confirmAllowMicrophoneAccess() {
        return confirm("Allow Mic?\n\nNo audio is being collected/stored/transmitted anywhere.");
    }
}