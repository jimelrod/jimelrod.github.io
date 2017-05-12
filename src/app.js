import {MainAnimations} from './main-animations';
import {FrequencyAnalyzer} from './frequency-analyzer';

(() => {

    if (confirm("Animate?")) {
        let mainAnimations = new MainAnimations();
        mainAnimations.start();

        if (FrequencyAnalyzer.confirmAllowMicrophoneAccess()) {
            let frequencyAnalyzer = new FrequencyAnalyzer();
            frequencyAnalyzer.initialize();
        }
    }
    
})();