window.onload = initializePage;

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const shipNumber = urlParams.get('ship');
    const shipMark = document.querySelector('.ship-mark');
    const shipNo = document.querySelector('.ship-no');
    setTimeout(() => startTypingAnimation(currentMessageIndex), 0);
    if (shipMark && shipNumber && shipNo) {
        shipMark.textContent = `#${shipNumber}`;
        shipNo.textContent = `SHIP ${shipNumber}`;
    }
}

// ---------------------------------------------------------------------------------------------

const messages = [
    "Here is the piece...You are smarter than you look.",
    "This should help you find the next piece...Hope you die soon."
];

let currentMessageIndex = 0;
let typingTimeout;


function disableButtons(disable) {
    const forwardButton = document.querySelector('.forward-button');
    forwardButton.disabled = disable;

}


function typeMessage(message, element, delay) {
    clearTimeout(typingTimeout);
    element.textContent = '';
    let index = 0;

    disableButtons(true);

    function typing() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            typingTimeout = setTimeout(typing, delay);
        } else {
            disableButtons(false);
        }
    }
    typing();
}

function startTypingAnimation(index, typingDelay = 30) {
    const messageElement = document.getElementById('animated-message');
    const backwardButton = document.querySelector('.backward-button');

    typeMessage(messages[index], messageElement, typingDelay);
    backwardButton.style.display = currentMessageIndex === 0 ? 'none' : 'block';
}

function handleNextClick() {
    setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
            currentMessageIndex++;
            startTypingAnimation(currentMessageIndex);
        } else {  
            const rewardPart = document.querySelector('.reward-part');
            const connectPart = document.querySelector('.connect-part');
            const cluePart = document.querySelector('.clue-part');
    
            rewardPart.style.display = 'none';
            connectPart.style.display = 'none';
            cluePart.style.display = 'flex';
        }
    }, 100);
}

function handleBackwardClick() {
    setTimeout(() => {
        if (currentMessageIndex > 0) {
            currentMessageIndex--;
            startTypingAnimation(currentMessageIndex, 10);
        }
    }, 100);
}