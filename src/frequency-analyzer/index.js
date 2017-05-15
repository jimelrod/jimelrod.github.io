import {Util} from '../util';

export class FrequencyAnalyzer {
    constructor() {
        this.visibleFrequencies = 128;
    }

    render() {
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
                let attr = document.createAttribute('height');
                attr.value = dataArray[i] * 2;
                ele.attributes.setNamedItem(attr);
                ele.style.fillOpacity = dataArray[i]/256;
            }
        }
        
        doDraw();
    }

    initialize() {
        navigator.getUserMedia({
            audio: true
        }, stream => {
            this.render();
            this.animate(stream)
        }, err => {
            // Ignore error thrown when user blocks mic access
            if (err.name != "PermissionDeniedError") {
                console.log(err);
            }
        });
    }

    static confirmAllowMicrophoneAccess() {
        return confirm("Allow Mic?\n\nNo audio is being collected/stored/transmitted anywhere.");
    }
}