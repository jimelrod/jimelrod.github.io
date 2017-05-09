// TODO: REFACTOR THIS SHIT!!!!!

// Namespace...
var EODG = {};

const QTY_OF_FREQS_to_CONSIDER = 256;
const VISIBLE_FREQS = 128;

// Possibly testing only...
EODG.renderInitialFreguencyAnalyzer = () => {
    let tr = document.querySelector('#freqAnalyzer g');

    for (let i = 0; i < VISIBLE_FREQS; i++) {
        let attr;
        let cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        cell.id = `cell${i}`;
        cell.classList.add('cell');

        attr = document.createAttribute('width');
        attr.value = 500 / VISIBLE_FREQS;
        cell.attributes.setNamedItem(attr);

        attr = document.createAttribute('height');
        attr.value = 500;
        cell.attributes.setNamedItem(attr);

        attr = document.createAttribute('x');
        attr.value = i * 500 / VISIBLE_FREQS;
        cell.attributes.setNamedItem(attr);

        attr = document.createAttribute('y');
        attr.value = 1000;
        cell.attributes.setNamedItem(attr);

        attr = document.createAttribute('style');
        attr.value = 'fill:#000000;';
        cell.attributes.setNamedItem(attr);

        tr.appendChild(cell);

        // document
        //     .getElementById(`cell${i}`)
        //     .style
        //     .fillOpacity = Math.random();
    }
};

EODG.handleStream = stream => {

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

        for (let i = 0; i < VISIBLE_FREQS; i++) {
            document
                .getElementById(`cell${i}`)
                .style
                .fillOpacity = dataArray[i]/256;
        }
    }
    
    doDraw();
};

EODG.draw = (frequencyArray) => {
    // for (let i = 0, counter = 0; i < VISIBLE_FREQS; i++) {
                
    //     let sum = 0,
    //         batchSize = QTY_OF_FREQS_to_CONSIDER / VISIBLE_FREQS;
        
    //     for (let j = 0; j < batchSize; j++, counter++) {
    //         sum += frequencyArray[counter];
    //     }
        
    //     document
    //         .getElementById(`cell${i}`)
    //         .style
    //         .fillOpacity = Math.floor(sum / batchSize)/400;
    // }
    //console.log(frequencyArray);
    
};

EODG.renderInitialFreguencyAnalyzer();

navigator.getUserMedia({
    audio: true
}, stream => EODG.handleStream(stream), err => console.log(err));

