import {MainAnimations} from './main-animations';
import {FrequencyAnalyzer} from './frequency-analyzer';

(() => {

    if (confirm("Animate?\n\nWARNING: This site contains animations which may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion is advised.")) {
        let mainAnimations = new MainAnimations();
        mainAnimations.start();

        if (FrequencyAnalyzer.confirmAllowMicrophoneAccess()) {
            let frequencyAnalyzer = new FrequencyAnalyzer();
            frequencyAnalyzer.initialize();
        }
    }    
})();