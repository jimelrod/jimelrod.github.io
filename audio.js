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

        // Pretty much stolen from https://gist.github.com/kevincennis/6149078

        var total = i = 0
            , percentage
            , float
            , rms
            , db;

        analyser.getByteTimeDomainData(timeData);

        // We may use freq data instead... not sure...
        // analyser.getByteFrequencyData(frequencyArray);

        while ( i < 1024 ) {
            float = ( timeData[i++] / 0x80 ) - 1;
            total += ( float * float );
        }

        rms = Math.sqrt(total / 1024);
        db  = 20 * ( Math.log(rms) / Math.log(10) );

        // sanity check
        db = Math.max(-48, Math.min(db, 0));
        percentage = 100 + ( db * 2.083 );
        
        document
            .getElementById('mask')
            .style
            .opacity = Math.floor(percentage)/200;
    }
    
    doDraw();
};