// DEBUGGING ONLY!!!!!



// for (let i = 0; i < 256; i++) {
//     let cell = document.createElement("div");
//     cell.id = `cell${i}`;
//     cell.classList.add("cell");

//     document
//         .querySelectorAll('.visual-tester')[0]
//         .appendChild(cell);
// }


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

    //analyser.getByteFrequencyData(frequencyArray);

    //console.log(frequencyArray);

    // while (true) {
    // //for (var x = 0; x < 1000; x++) {
    //     analyser.getByteFrequencyData(frequencyArray);
    //     updateCells(frequencyArray);
    //     // for (let i = 0; i < 256; i++) {
            
    //     //     // let ele = document.getElementById(`cell${i}`);
    //     //     // ele.style.backgroundColor = `rgb(${frequencyArray[i]}, 0, 0)`;
    //     //     // ele.innerHTML = frequencyArray[i];

    //     //     //console.log(`${i} - ${frequencyArray[i]}`);


    //     // }

    // }

    let timeData = new Uint8Array(1024);
    // analyser.getByteTimeDomainData(timeData);
    // console.log(timeData);

    function doDraw() {
         requestAnimationFrame(doDraw);
        // analyser.getByteFrequencyData(frequencyArray);
        // //updateCells(frequencyArray);
        // let sum = 0;
        // for (let i = 0; i < 256; i++) {
        //     sum += frequencyArray[i];
        // }
        // let average = sum / 256;


        // document
        //     .querySelectorAll('.visual-tester')[0]
        //     .style
        //     .backgroundColor = `rgb(${average}, ${average}, ${average})`;


        // Stolen from https://gist.github.com/kevincennis/6149078

        var total = i = 0
            , percentage
            , float
            , rms
            , db;
        analyser.getByteTimeDomainData(timeData);
        while ( i < 1024 ) {
            float = ( timeData[i++] / 0x80 ) - 1;
            total += ( float * float );
        }
        rms = Math.sqrt(total / 1024);
        db  = 20 * ( Math.log(rms) / Math.log(10) );
        // sanity check
        db = Math.max(-48, Math.min(db, 0));
        percentage = 100 + ( db * 2.083 );
        let average = Math.floor(percentage);
        
        document
            .getElementById('mask')
            .style
            // .opacity = 1 - average/500;
            .opacity = average/200;
    }
    doDraw();
};