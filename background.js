if (typeof importScripts === 'function') {
    importScripts('utils.js');
}
  
chrome.commands.onCommand.addListener(command => {
    switch (command) {
        case 'reset-speed': 
            injectSpeedScript(1);
            chrome.storage.local.set({ speed: 1.0 });
            break;
        case 'increase-speed': 
            changeLocalSpeedByStep(0.25);
            injectIncrementSpeedScript(0.25);
            break;
        case 'decrease-speed': 
            changeLocalSpeedByStep(-0.25);
            injectIncrementSpeedScript(-0.25);
            break;
        default: 
            break;
    }
});

function changeLocalSpeedByStep(step){
    chrome.storage.local.get(['speed'], ({ speed }) => {
        let storedSpeed = speed || 1.0; 
        let modifiedSpeed = (Number(storedSpeed) + step).toFixed(2);
        chrome.storage.local.set({ speed: modifiedSpeed });
    });
}