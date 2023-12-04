let currSpeed = document.querySelector('#currentspeed');

let storedSpeed;
chrome.storage.local.get(['speed'], ({ speed }) => {
  storedSpeed = speed || 1.0; 
  if(speed && !Number.isNaN(speed))
    currSpeed.innerText = speed;
});

document.getElementById('customspeed').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const { speed } = Object.fromEntries(data);
  if (speed) 
    injectSpeedScript(speed);
  currSpeed.innerText = speed;
  storedSpeed = speed;
  chrome.storage.local.set({ speed: storedSpeed });
});

document.getElementById('reset').addEventListener('click', () => {
  injectSpeedScript(1);
  currSpeed.innerText = '1.0';
  storedSpeed = 1.0;
  chrome.storage.local.set({ speed: 1.0 });
});

document.getElementById('decrement-0.25').addEventListener('click', () => handleButtonClick(-0.25));
document.getElementById('decrement-0.1').addEventListener('click', () => handleButtonClick(-0.1));
document.getElementById('increment-0.1').addEventListener('click', () => handleButtonClick(0.1));
document.getElementById('increment-0.25').addEventListener('click', () => handleButtonClick(0.25));

function handleButtonClick(step) {
  injectIncrementSpeedScript(step);
  let modifiedSpeed = (Number(storedSpeed) + step).toFixed(2);
  currSpeed.innerText = modifiedSpeed; 
  storedSpeed = modifiedSpeed;
  chrome.storage.local.set({ speed: modifiedSpeed });

}

