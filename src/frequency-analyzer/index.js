export class FrequencyAnalyzer {
    constructor() {
        this.visibleFrequencies = 128;
    }

    render() {
        let freqAnalyzerEle = document.querySelector('#freqAnalyzer g');

        for (let i = 0; i < this.visibleFrequencies; i++) {
            let attr;
            let cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            cell.id = `cell${i}`;
            cell.classList.add('cell');

            attr = document.createAttribute('width');
            attr.value = 500 / this.visibleFrequencies;
            cell.attributes.setNamedItem(attr);

            // attr = document.createAttribute('height');
            // attr.value = 500;
            // cell.attributes.setNamedItem(attr);

            attr = document.createAttribute('x');
            attr.value = i * 500 / this.visibleFrequencies;
            cell.attributes.setNamedItem(attr);

            attr = document.createAttribute('y');
            attr.value = 1000;
            cell.attributes.setNamedItem(attr);

            freqAnalyzerEle.appendChild(cell);
        }
    }

    animate(stream) {
        let visibleFrequencies = this.visibleFrequencies;
        console.log(visibleFrequencies);

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
        console.log(bufferLength);
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
        }, err => console.log(err));
    }

    static confirmAllowMicrophoneAccess() {
        return confirm("Allow Mic?\n\nNo audio is being collected/stored/transmitted anywhere.");
    }
}