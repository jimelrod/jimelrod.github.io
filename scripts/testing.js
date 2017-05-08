let tr = document.querySelector('#freqAnalyzer g');

let QTY = 400;


for (let i = 0; i < QTY; i++) {
    let attr;
    let cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    cell.id = `cell${i}`;
    cell.classList.add('cell');

    attr = document.createAttribute('width');
    attr.value = 500 / QTY;
    cell.attributes.setNamedItem(attr);

    attr = document.createAttribute('height');
    attr.value = 500;
    cell.attributes.setNamedItem(attr);

    attr = document.createAttribute('x');
    attr.value = i * 500 / QTY;
    cell.attributes.setNamedItem(attr);

    attr = document.createAttribute('y');
    attr.value = 1000;
    cell.attributes.setNamedItem(attr);

    attr = document.createAttribute('style');
    attr.value = 'fill:#000000;';
    cell.attributes.setNamedItem(attr);

    tr.appendChild(cell);



    // var val = Math.floor(i/2);


    // document
    //     .getElementById(`cell${i}`)
    //     .style
    //     .fill = `rgb(${val}, ${val}, ${val})`;
}

// EODG.addAttribute = (ele, attr, val) => {
//     attr = document.createAttribute(attr);
//     attr.value = val;
//     ele.attributes.setNamedItem(attr);
//     return ele;
// };

navigator.getUserMedia({
    audio: true
}, stream => EODG.handleStream(stream), err => console.log(err));

EODG.handleStream = stream => {
    
    //Audio stops listening in FF without // window.persistAudioStream = stream;
    //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
    //https://support.mozilla.org/en-US/questions/984179
    window.persistAudioStream = stream;

    let audioContent = new AudioContext(),
        audioStream = audioContent.createMediaStreamSource(stream),
        analyser = audioContent.createAnalyser();

    audioStream.connect(analyser);
    analyser.fftSize = 1024;

    let frequencyArray = new Uint8Array(analyser.frequencyBinCount);
    let timeData = new Uint8Array(analyser.fftSize);

    function doDraw() {
         requestAnimationFrame(doDraw);

        analyser.getByteFrequencyData(frequencyArray);

        for (let i = 0; i < 500; i++) {
            let x = Math.floor(frequencyArray[i]);
            // document
            //     .getElementById(`cell${i}`)
            //     .style
            //     .fill = `rgb(${x}, ${x}, ${x})`;
            document
                .getElementById(`cell${i}`)
                .style
                .fillOpacity = x/255;
        }
    }
    
    doDraw();
};