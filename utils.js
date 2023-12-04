function setVideoSpeed(speed) {
    const speedNumber = Number(speed);
    document.querySelectorAll('video').forEach(vid => {
        vid.playbackRate = speedNumber;
    });
    console.log(`Set video speed to ${speed}x.`);
}
  
function stepVideoSpeed(increment) {
    document.querySelectorAll('video').forEach(vid => {
        vid.playbackRate = Math.max(0.05, vid.playbackRate + increment);
    });
    console.log(`${increment < 0 ? 'Decremented' : 'Incremented'} video speed by ${Math.abs(increment)}x.`);
}
  
async function getActiveTabId() {
    try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabId = activeTab?.id;
    return tabId;
    } catch (error) {
        console.error('Error getting active tab ID:', error);
        return null;
    }
}
  
async function injectScript(func, args) {
    try {
        const tabId = await getActiveTabId();
        if (tabId === null) {
            console.warn('Unable to get active tab ID');
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId, allFrames: true },
            func,
            args,
        });
    } catch (error) {
        console.error('Error injecting script:', error);
    }
}

async function injectSpeedScript(speed) {
    await injectScript(setVideoSpeed, [speed]);
}

async function injectIncrementSpeedScript(increment) {
    await injectScript(stepVideoSpeed, [increment]);
}